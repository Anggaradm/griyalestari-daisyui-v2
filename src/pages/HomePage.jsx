import React from "react";
import { About, Hero, Navbar, Photos } from "../components";

const HomePage = () => {
  return (
    <>
      <div id="navbar">
        <Navbar />
      </div>
      <div id="hero">
        <Hero />
      </div>
      <div id="about">
        <About />
        <Photos />
      </div>
    </>
  );
};

export default HomePage;
