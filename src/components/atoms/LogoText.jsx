import React from "react";
import { Link } from "react-router-dom";

const LogoText = () => {
  return (
    <>
      <Link to="/" className="font-bold lg:text-2xl">
        Griya <span className="text-accent">Lestari</span>
      </Link>
    </>
  );
};

export default LogoText;
