import React from "react";
import { Link } from "react-router-dom";
import LogoText from "../atoms/LogoText";

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-base-100 px-[7%] fixed z-40">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a href="#hero">Beranda</a>
              </li>
              <li>
                <a href="#about">Tentang Kami</a>
              </li>
              <li>
                <a href="#contact">Kontak</a>
              </li>
              <li className="max-w-md mt-4 flex flex-col gap-1">
                <Link to="/signin" className="btn btn-outline btn-ghost btn-sm">
                  Masuk
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm">
                  Daftar
                </Link>
              </li>
            </ul>
          </div>
          <LogoText />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-medium">
            <li>
              <a href="#hero">Beranda</a>
            </li>
            <li>
              <a href="#about">Tentang Kami</a>
            </li>
            <li>
              <a href="#contact">Kontak</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end hidden lg:flex gap-2">
          <Link to="/signin" className="btn btn-outline btn-ghost">
            Masuk
          </Link>
          <Link to="/signup" className="btn btn-primary">
            Daftar
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
