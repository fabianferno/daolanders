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
            <p className="text-secondary">
              A Game-Fi DAO where you can play games solo and against other
              people and earn exciting rewards.
            </p>
          </div>
        </div>

        <h5 className="py-5 text-end my-5  text-white">
          Powered by the <span className="fw-bold">Polygon Network</span>
        </h5>

        <div className="d-md-flex align-items-center justify-content-center my-5 container">
          <div className="col-md-5 mx-md-5">
            <img
              src="tokens/cricket_1.png"
              className="img-fluid"
              alt=""
              srcSet=""
            />
          </div>
          <div className="col-md-7 mt-5 mt-md-0">
            <h1 className="fw-bold w-75">Verify Once, Bank Anywhere</h1>
            <h4 className="text-white fw-light w-75">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit unde
              neque sapiente quae recusandae, incidunt totam sit quaerat
              mollitia voluptate accusamus suscipit quidem hic quibusdam dolor
              officia vero dignissimos. Accusantium!
            </h4>
          </div>
        </div>

        <div className="d-md-flex align-items-center justify-content-center my-5 container">
          <div className="col-md-7 mt-5 mt-md-0">
            <h1 className="fw-bold w-75">Decentralized KYC</h1>
            <h4 className="text-white fw-light w-75">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Reprehenderit, unde in quam neque labore at debitis fugiat est ut
              soluta consequatur cupiditate non, hic quos rerum quo dolorum sint
              delectus?
            </h4>
          </div>
          <div className="col-md-5 mx-md-5">
            <img
              src="tokens/gamblling_1.png"
              className="img-fluid"
              alt=""
              srcSet=""
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Home;
