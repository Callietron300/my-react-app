import React from "react";
import ReactDOM from "react-dom/client";

import Time from "./Time";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="app-container">
      {" "}
      <Time />
    </div>
    <p className="tag">
      This project was coded by Callie🦎 and is{" "}
      <a
        href="https://github.com/Callietron300/React-Weather-App"
        target="_blank"
        rel="noreferrer"
      >
        open source
      </a>
      <br />
      Design inspired by{" "}
      <a
        href="https://dribbble.com/nealhampton"
        target="_blank"
        rel="noreferrer"
      >
        Neal Hampton's
      </a>{" "}
      <a
        href="https://dribbble.com/shots/6680361-Dribbble-Daily-UI-37-Weather-2"
        target="_blank"
        rel="noreferrer"
      >
        Weather App UI Design
      </a>
      .
    </p>
  </React.StrictMode>
);
