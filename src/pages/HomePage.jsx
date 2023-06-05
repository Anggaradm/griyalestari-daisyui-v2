import React from "react";
import { About, Copyright, Footer, Hero, Navbar, Photos } from "../components";

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
      <div id="contact">
        <Footer />
        <Copyright />
      </div>
    </>
  );
};

export default HomePage;
