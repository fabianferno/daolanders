import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis();

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
      >
        <div className="mt-5 p-5 text-center container">
          <motion.h1
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            //whileHover={{ y: -10, scale: 1.1, transition: { duration: 0.6 } }}
            className="fw-bold"
            style={{ fontSize: "6rem" }}
          >
            <img
              src="/apple-touch-icon.png"
              className="pb-3"
              style={{ height: "100px" }}
              alt=""
            />{" "}
            DAOlanders
          </motion.h1>
          <h2 className="mt-4">
            Welcome to the world of monopoly that runs on NFT centered DAOs.
          </h2>
          <p className="text-secondary">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit
            expedita debitis itaque voluptates cumque quos, eaque dolores
            placeat iure, soluta quidem nulla sunt veniam nemo quisquam
            molestiae, dolor deleniti voluptatum. Omnis autem, dicta laudantium
            in quidem officiis, consequuntur aut mollitia facilis nesciunt
            quisquam nulla nostrum neque commodi tenetur velit eius maxime, quas
            voluptate a hic temporibus ex vero at. Magnam.
          </p>

          <div className="mt-5 pt-5">
            <h5 className="text-danger">
              Built by{" "}
              <a
                href="https://twitter.com/FabianFerno"
                className="fw-bold text-white text-decoration-none"
              >
                Fabian
              </a>{" "}
              &#38;{" "}
              <a
                href="https://twitter.com/GabrielXavier"
                className="fw-bold text-white text-decoration-none"
              >
                Gabriel
              </a>{" "}
            </h5>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Home;
