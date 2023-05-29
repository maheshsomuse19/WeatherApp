import React, { useState } from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <CurrentLocation />
      </div>
      <div className="footer-info">
        <a href="https://github.com/maheshsomuse19/WeatherApp">
          Download Source Code
        </a>{" "}
        | Developed by{" "}
        <a target="_blank" href="https://mahesh-portfolio-beta.vercel.app/">
          Mahesh Somuse
        </a>{" "}
      </div>
    </React.Fragment>
  );
}

export default App;
