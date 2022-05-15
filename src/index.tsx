import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import worldID from "@worldcoin/id"; // If you installed the JS package as a module

import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use

worldID.init("world-id-container", {
  enableTelemetry: true,
  actionId: "0x330C8452C879506f313D1565702560435b0fee4C",
});

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const result = await worldID.enable();
    console.log("World ID verified succesfully:", result);
  } catch (failure) {
    console.warn("World ID verification failed:", failure);
    // Re-activate here so your end user can try again
  }
});

root.render(
  <React.StrictMode>
    <MoralisProvider
      serverUrl="https://spo7cc1zgorg.usemoralis.com:2053/server"
      appId="rCyUM1zSfzrlCRuQ46ItxRaqMo2RCLMgWft75hTm"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MoralisProvider>
  </React.StrictMode>
);
