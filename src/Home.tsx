import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";

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
    <div className="p-5 text-center">
      <h1 className="fw-bold" style={{ fontSize: "6rem" }}>
        <img
          src="/apple-touch-icon.png"
          className="pb-3"
          style={{ height: "100px" }}
          alt=""
        />{" "}
        DAOlanders
      </h1>
      <h2 className="mt-4">
        Welcome to the world of monopoly that runs on NFT centered DAOs.
      </h2>
      <p className="text-secondary">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit expedita
        debitis itaque voluptates cumque quos, eaque dolores placeat iure,
        soluta quidem nulla sunt veniam nemo quisquam molestiae, dolor deleniti
        voluptatum. Omnis autem, dicta laudantium in quidem officiis,
        consequuntur aut mollitia facilis nesciunt quisquam nulla nostrum neque
        commodi tenetur velit eius maxime, quas voluptate a hic temporibus ex
        vero at. Magnam.
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
  );
}

export default Home;
