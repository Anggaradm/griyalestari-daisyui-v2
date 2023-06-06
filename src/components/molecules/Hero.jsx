import React from "react";
import "./styles/hero.css";

const Hero = () => {
  return (
    <>
      <div className="hero min-h-screen" id="hero-bg">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-4xl font-bold mix-blend-difference">
              Temukan Hunian Nyaman <br />
              di Griya Lestari
            </h1>
            <p className="mb-5 mix-blend-difference">
              Jaminan Fasilitas Lengkap dan Keamanan 24 Jam untuk Kenyamanan
              Anda.
            </p>
            <button className="btn btn-primary">Lihat Kamar</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
