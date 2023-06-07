import React from "react";
import { Link } from "react-router-dom";

const DrawerDashboard = () => {
  return (
    <>
      <div className="drawer z-50">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content"></div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content pt-[5%]">
            {/* Sidebar content here */}

            <li>
              <details open>
                <summary>User</summary>
                <ul>
                  <li>
                    <Link to="/dashboard">Profil</Link>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <details open>
                <summary>Kamar</summary>
                <ul>
                  <li>
                    <Link to="/dashboard-roominfo">Info Kamar</Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DrawerDashboard;
