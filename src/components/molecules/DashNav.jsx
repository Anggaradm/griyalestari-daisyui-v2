import React from "react";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";
import { DrawerDash } from "..";

const NavbarDashboard = () => {
  return (
    <>
      <div className="navbar fixed bg-base-100 px-[7%] z-40">
        <div className="navbar-start">
          <div className="dropdown">
            <label
              htmlFor="my-drawer"
              className="btn btn-ghost btn-circle drawer-overlay"
            >
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
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-left lg:hidden">
            <label tabIndex={0} className="btn m-1 flex">
              <Icon.Circle size={3} />
              <Icon.Circle size={3} />
              <Icon.Circle size={3} />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/" className="btn btn-ghost">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/" className="btn btn-ghost">
                  Keluar
                </Link>
              </li>
            </ul>
          </div>
          <div className="hidden lg:flex">
            <Link to="/" className="btn btn-ghost">
              Beranda
            </Link>
            <Link to="/" className="btn btn-ghost">
              Keluar
            </Link>
          </div>
        </div>
      </div>
      <DrawerDash />
    </>
  );
};

export default NavbarDashboard;
