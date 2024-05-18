import ReactDOM from "react-dom/client";
import React from "react";

import Router from "./Router";
import "./css/index.css";
import "./css/app.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);
