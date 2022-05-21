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

            <h2 className="mt-3 pb-2 text-white">
              a DAO based NFT marketplace
            </h2>
            <p className="text-secondary">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit
              expedita debitis itaque voluptates cumque quos, eaque dolores
              placeat iure, soluta quidem nulla sunt veniam nemo quisquam
              molestiae, dolor deleniti voluptatum. Omnis autem, dicta
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Home;
