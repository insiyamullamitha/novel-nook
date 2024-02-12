import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BasketProvider } from "./components/BasketContext";

const root = createRoot(document.getElementById("root"));

root.render(
  <BasketProvider>
    <App />
  </BasketProvider>
);
