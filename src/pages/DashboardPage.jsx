import React from "react";
import { DashNav, MemberProfile } from "../components";

const DashboardPage = () => {
  return (
    <>
      <div id="navbar">
        <DashNav />
      </div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <MemberProfile />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
