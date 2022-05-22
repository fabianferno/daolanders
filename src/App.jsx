import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import Home from "components/Home";
import Play from "components/Play";
import Register from "components/Register";
import Message from "components/Message";
import Marketplace from "components/Marketplace";

import ERC20Balance from "components/ERC20Balance";
import ERC20Transfers from "components/ERC20Transfers";
import NFTBalance from "components/NFTBalance";
import Wallet from "components/Wallet";
import { Layout } from "antd";
import NativeBalance from "components/NativeBalance";

import { Waku } from "js-waku";

import Contract from "components/Contract/Contract";
import MenuItems from "./components/MenuItems";
const { Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerRight: {
    background: "#222222",
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};

// eslint-disable-next-line
const App = ({ isServerInfo }) => {
  // console.log("isServerInfo", isServerInfo);

  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  const [waku, setWaku] = React.useState(undefined);
  const [wakuStatus, setWakuStatus] = React.useState("None");

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

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
  return (
    <Layout style={{ minHeight: "100vh" }} className="bg-black text-white">
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link
              className="btn navbar-brand fw-bold text-white"
              style={{ background: "#4444fc" }}
              to="/"
            >
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <MenuItems />

              <p className="text-dark me-2 mt-2">Waku: {wakuStatus}</p>

              <Chains />
              <NativeBalance />
              <Account />
            </div>
          </div>
        </nav>

        <div style={styles.content}>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/play">
              <Play />
            </Route>
            <Route path="/contract">
              <Contract />
            </Route>
            <Route path="/message">
              <Message />
            </Route>
            <Route path="/marketplace">
              <Marketplace />
            </Route>
            <Route path="/wallet">
              <Wallet />
            </Route>

            <Route path="/erc20balance">
              <ERC20Balance />
            </Route>

            <Route path="/erc20transfers">
              <ERC20Transfers />
            </Route>

            <Route path="/nftBalance">
              <NFTBalance />
            </Route>

            <Route path="/nonauthenticated">
              <>Please login using the "Authenticate" button</>
            </Route>

            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer
        className="bg-black text-white mt-5 px-4 container"
        style={{ textAlign: "right" }}
      >
        <p>
          Made with ❤️ <br /> by{" "}
          <a
            href="https://twitter.com/FabianFerno"
            className="fw-bold text-white text-decoration-none"
          >
            Fabian
          </a>{" "}
          and{" "}
          <a
            href="https://twitter.com/GabrielXavier"
            className="fw-bold text-white text-decoration-none"
          >
            Gabriel
          </a>
        </p>
      </Footer>
    </Layout>
  );
};

export const Logo = () => (
  <div className="bg-dark px-4" style={{ display: "flex" }}>
    <Link className="navbar-brand fw-bold text-white mx-2" to="/">
      DAOlanders
    </Link>
  </div>
);

export default App;
