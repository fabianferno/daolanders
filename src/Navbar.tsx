import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";
import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";

function Navbar() {
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
      // console.log(user?.attributes.ethAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user!.get("ethAddress"));
          window.location.replace("/play");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const logOut = async () => {
    await logout();
    console.log("logged out");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          📍 DAOlanders
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active fw-bold"
                aria-current="page"
                to="/register"
              >
                Mint a land
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/play">
                Play
              </Link>
            </li>
          </ul>

          <div className="btn-group d-md-flex d-block">
            {!user ? (
              <button className="btn btn-danger" onClick={login}>
                Connect Wallet
              </button>
            ) : (
              <React.Fragment>
                <button
                  className="btn btn-danger disabled btn-block"
                  style={{ fontSize: "0.7rem" }}
                  onClick={login}
                >
                  Player address: <strong>{user?.attributes.ethAddress}</strong>
                </button>
                <button
                  className="btn btn-secondary btn-block"
                  onClick={logOut}
                  disabled={isAuthenticating}
                >
                  Logout
                </button>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
