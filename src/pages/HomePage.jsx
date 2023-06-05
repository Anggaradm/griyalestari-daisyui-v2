import React from "react";
import { Hero, Navbar } from "../components";

const HomePage = () => {
  return (
    <>
      <div id="navbar">
        <Navbar />
      </div>
      <div id="hero">
        <Hero />
      </div>
    </>
  );
};

export default HomePage;
