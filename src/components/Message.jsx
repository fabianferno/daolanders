import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";

import protobuf from "protobufjs";
import { Waku, WakuMessage } from "js-waku";

const SimpleChatMessage = new protobuf.Type("SimpleChatMessage")
  .add(new protobuf.Field("timestamp", 1, "uint64"))
  .add(new protobuf.Field("text", 2, "string"));

const ContentTopic = `/relay-reactjs-chat/1/chat/proto`;

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

function Message() {
  const { isAuthenticated, user } = useMoralis();
  const [waku, setWaku] = React.useState(undefined); // eslint-disable-line
  const [wakuStatus, setWakuStatus] = React.useState("None"); // eslint-disable-line
  // Using a counter just for the messages to be different
  const [sendCounter, setSendCounter] = React.useState(0);

  React.useEffect(() => {
    if (waku) return;
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

  const sendMessageOnClick = () => {
    // Check Waku is started and connected first.
    if (wakuStatus !== "Ready") return;

    sendMessage(`Here is message #${sendCounter}`, waku, new Date()).then(() =>
      console.log("Message sent"),
    );

    // For demonstration purposes.
    setSendCounter(sendCounter + 1);
  };

  const [messages, setMessages] = React.useState([]);

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

  useEffect(() => {
    if (isAuthenticated) {
      // add your logic here
      console.dir(user?.attributes.ethAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <div className="text-white mt-5">
      <h1 className="fw-bold mb-5 text-white">Send a Message</h1>
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
  );
}

export default Message;
