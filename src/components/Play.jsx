import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const { isAuthenticated, user } = useMoralis();
  const [selectedGame, setSelectedGame] = useState("pacboy");

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
        className="container"
      >
        <h1 className="text-white text-center mt-3">Play to earn mini games</h1>
        <div className="mt-3 d-flex justify-content-center">
          <button
            type="button"
            className="mx-2 btn text-white fw-bold"
            style={{ background: "#4444fc" }}
            onClick={() => setSelectedGame("pacboy")}
          >
            Pac Boy
          </button>
          <button
            type="button"
            className="mx-2 btn text-white fw-bold"
            style={{ background: "#4444fc" }}
            onClick={() => setSelectedGame("fighter-bloks")}
          >
            Fighter Bloks
          </button>
          <button
            type="button"
            className="mx-2 btn text-white fw-bold"
            style={{ background: "#4444fc" }}
            onClick={() => setSelectedGame("flappies")}
          >
            Flappies
          </button>
        </div>
        {selectedGame === "pacboy" && (
          <div className="mt-4 d-flex justify-content-center align-items-center">
            <iframe
              style={{ height: "580px", width: "500px" }}
              src="games/pacboy"
              frameBorder="0"
              scrolling="no"
            ></iframe>
          </div>
        )}

        {selectedGame === "fighter-bloks" && (
          <div className="mt-4 d-flex justify-content-center align-items-center">
            <iframe
              style={{ height: "600px", width: "1100px" }}
              src="games/fighter-bloks"
              frameBorder="0"
              scrolling="no"
            ></iframe>
          </div>
        )}

        {selectedGame === "flappies" && (
          <div className="mt-4 d-flex justify-content-center align-items-center">
            <iframe
              style={{ height: "580px", width: "500px" }}
              src="games/flappies"
              frameBorder="0"
              scrolling="no"
            ></iframe>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default Home;
