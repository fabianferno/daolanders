import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const { isAuthenticated, user } = useMoralis();

  useEffect(() => {
    if (isAuthenticated) {
      // add your logic here
      console.dir(user?.attributes.ethAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 20 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 2.5 }}
        className="container mt-5"
      >
        <div className="d-block d-md-flex justify-content-start align-items-center ">
          <motion.div
            className="col-12 col-md-3 pe-md-5"
            animate={{ x: [1, -15, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <img
              src="https://media3.giphy.com/media/QsOq3W7wCoa0sC2QEN/giphy.gif?cid=ecf05e47vw37g2a9n4oymaagriqb2ongpm9kz137qwk47b3l&rid=giphy.gif&ct=s"
              style={{
                height: "350px",
                width: "350px",
                objectFit: "cover",
              }}
              alt=""
            />
          </motion.div>
          <div className="text-white text-start col-12 col-md-9">
            <h1 className="fw-bold text-white " style={{ fontSize: "5em" }}>
              DAOlanders
            </h1>

            <h2 className="mt-3 pb-2 text-white w-75">
              A Game-Fi DAO where you can play games solo and against other
              people and earn exciting rewards.
            </h2>
            <h5 className="text-secondary fw-light w-75">
              This project is a DAO focused on investing together to play games
              and earn money. Once you create a DAO, you will be provided a land
              and a God to worship, play with and earn rewards. More the people
              in the DAO, higher the rewards. People can interact with each
              other in the DAO giving a feel of metaverse.
            </h5>
          </div>
        </div>

        <h5 className="py-5 text-end mt-5 mb-3 text-white">Powered by</h5>
        <div className="d-flex justify-content-end align-items-center mb-5 pb-5">
          <img
            className="mx-2"
            height="100px"
            src="https://cryptologos.cc/logos/polygon-matic-logo.png"
            alt="Polygon"
          />
          <img
            className="mx-2"
            height="100px"
            src="https://cryptologos.cc/logos/chainlink-link-logo.png"
            alt="Chainlink"
          />
          <img
            className="mx-2"
            height="100px"
            src="https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png"
            alt="Wallet Connect"
          />
          <img
            className="mx-2"
            height="100px"
            src="https://images.ctfassets.net/q5ulk4bp65r7/1rFQCqoq8hipvVJSKdU3fQ/21ab733af7a8ab404e29b873ffb28348/coinbase-icon2.svg"
            alt=""
          />
          <img
            className="mx-2"
            height="100px"
            src="https://www.pngall.com/wp-content/uploads/10/Filecoin-Crypto-Logo-PNG-Image.png"
            alt="Filecoin"
          />
          <img
            className="mx-2"
            height="100px"
            src="https://docs.spheron.network/img/favicon.ico"
            alt="Spheron UI"
          />
          <img
            className="mx-2"
            height="100px"
            src="https://pbs.twimg.com/profile_images/1521745022709813251/znGz22qI_400x400.jpg"
            alt="Waku Connect"
          />
        </div>

        <div className="d-md-flex align-items-center justify-content-center my-5 container">
          <div className="col-md-4 mx-md-5">
            <img src="tokens/cricket_1.png" height={400} alt="" srcSet="" />
          </div>
          <div className="col-md-7 mt-5 mt-md-0">
            <h1 className="fw-bold text-white w-75">Earn with your NFTs</h1>
            <h4 className="text-secondary fw-light w-75">
              These super attractive Gods are completely made from scratch by
              our team. Here's the twist, you can't worship a God forever! You
              can list Gods in the market place and get a completely unique God
              with new abilities for FREE just like that! There are 5 levels of
              rarity which adds more fun and exciting opportunities.
            </h4>
          </div>
        </div>

        <div className="d-md-flex align-items-center justify-content-center my-5 container">
          <div className="col-md-6 mt-5 mt-md-0 text-end">
            <h1 className="fw-bold text-white">Play to make bucks</h1>
            <h4 className="text-secondary fw-light">
              Be active and trade NFTs in the marketplace to be earn as you grow
              in the world of DAOlanders. Why are you still waiting? Connect
              your wallet and get started with your DAOlanders journey. Let the
              games begin!
            </h4>
          </div>
          <div className="col-md-5 mx-md-5">
            <img src="tokens/money_5.png" height={500} alt="" srcSet="" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Home;
