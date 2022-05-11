import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";

function Monitor() {
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
    <div className="p-5 text">
      <h1 className="fw-bold mb-5">Let's play!</h1>
      <canvas></canvas>
    </div>
  );
}

export default Monitor;
