import React, { useEffect } from "react";
import SmoothScroll from "smooth-scroll";
import { About, Copyright, Footer, Hero, Navbar, Photos } from "../components";

const HomePage = () => {
  useEffect(() => {
    const scroll = new SmoothScroll('a[href*="#"]', {
      speed: 800, // Kecepatan scroll (opsional, default: 800)
      offset: 70, // Jarak offset dari elemen target (opsional, default: 0)
      easing: "easeInOutCubic", // Efek easing (opsional, default: 'easeInOutCubic')
    });
  }, []);

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
