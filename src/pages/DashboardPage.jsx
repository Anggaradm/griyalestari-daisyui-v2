import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import {
  AdminProfile,
  AllRoomInfo,
  DashNav,
  EditMemberProfile,
  MemberProfile,
  SingleRoomInfo,
} from "../components";

const DashboardPage = () => {
  return (
    <>
      <div id="navbar">
        <DashNav />
      </div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <Routes>
              <Route path="/dashboard" element={<AdminProfile />} />
              <Route
                path="/dashboard-editmember"
                element={<EditMemberProfile userId="01" />}
              />
              <Route path="/dashboard-roominfo" element={<SingleRoomInfo />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
