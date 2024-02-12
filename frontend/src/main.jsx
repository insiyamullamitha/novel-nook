import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BasketProvider } from "./components/BasketContext";

ReactDOM.render(
  <BasketProvider>
    <App />
  </BasketProvider>,
  document.getElementById("root")
);
