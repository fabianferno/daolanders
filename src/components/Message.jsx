import { Waku, WakuMessage } from "js-waku";
import * as React from "react";
import protobuf from "protobufjs";
import { useMoralis } from "react-moralis";
import { motion, AnimatePresence } from "framer-motion";

const ContentTopic = `/relay-reactjs-chat/1/chat/proto`;

const SimpleChatMessage = new protobuf.Type("SimpleChatMessage")
  .add(new protobuf.Field("timestamp", 1, "uint64"))
  .add(new protobuf.Field("text", 2, "string"));

function Message() {
  const { isAuthenticated, user } = useMoralis(); // eslint-disable-line
  const [waku, setWaku] = React.useState(undefined);
  const [wakuStatus, setWakuStatus] = React.useState("None");

  // Using a counter just for the messages to be different
  const [sendCounter, setSendCounter] = React.useState(0);
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    if (!!waku) return; // eslint-disable-line
    if (wakuStatus !== "None") return;

    setWakuStatus("Starting");

    Waku.create({ bootstrap: { default: true } }).then((waku) => {
      setWaku(waku);
      setWakuStatus("Connecting");
      waku.waitForRemotePeer().then(() => {
        setWakuStatus("Ready");
      });
    });
  }, [waku, wakuStatus]);

  const processIncomingMessage = React.useCallback((wakuMessage) => {
    if (!wakuMessage.payload) return;

    const { text, timestamp } = SimpleChatMessage.decode(wakuMessage.payload);

    const time = new Date();
    time.setTime(timestamp);
    const message = { text, timestamp: time };

    setMessages((messages) => {
      return [message].concat(messages);
    });
  }, []);

  React.useEffect(() => {
    if (!waku) return;

    // Pass the content topic to only process messages related to your dApp
    waku.relay.addObserver(processIncomingMessage, [ContentTopic]);

    // `cleanUp` is called when the component is unmounted, see ReactJS doc.
    return function cleanUp() {
      waku.relay.deleteObserver(processIncomingMessage, [ContentTopic]);
    };
  }, [waku, wakuStatus, processIncomingMessage]);

  const sendMessageOnClick = () => {
    // Check Waku is started and connected first.
    if (wakuStatus !== "Ready") return;

    sendMessage(`Here is message #${sendCounter}`, waku, new Date()).then(() =>
      console.log("Message sent"),
    );

    // For demonstration purposes.
    setSendCounter(sendCounter + 1);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 20 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 2.5 }}
      >
        <div className="text-white mt-5">
          <h1 className="fw-bold mb-5 text-white">Send a Message</h1>

          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                DAO Owner
              </label>
              <input
                type="text"
                className="form-control"
                value={user?.attributes.ethAddress}
                disabled
              />
              <div id="emailHelp" className="form-text">
                Connected with wallet
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Token Proposal
              </label>
              <img src="tokens/snake_1.png" height="300px" alt="" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Describe why you're selling - the negotiation xD
              </label>
              <textarea className="form-control" cols={30} rows={5}></textarea>
            </div>
          </form>

          <p className="fw-bold">Waku Status: {wakuStatus}</p>
          <ul>
            {messages.map((msg) => {
              return (
                <li>
                  <p>
                    {msg.timestamp.toString()}: {msg.text}
                  </p>
                </li>
              );
            })}
          </ul>
          <button
            className="btn btn-dark"
            onClick={sendMessageOnClick}
            disabled={wakuStatus !== "Ready"}
          >
            Send Message with Waku
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function sendMessage(message, waku, timestamp) {
  const time = timestamp.getTime();

  // Encode to protobuf
  const protoMsg = SimpleChatMessage.create({
    timestamp: time,
    text: message,
  });
  const payload = SimpleChatMessage.encode(protoMsg).finish();

  // Wrap in a Waku Message
  return WakuMessage.fromBytes(payload, ContentTopic).then((wakuMessage) =>
    // Send over Waku Relay
    waku.relay.send(wakuMessage),
  );
}

export default Message;
