import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import {
  AddMaintenance,
  AddPaymentAdmin,
  AddPaymentMember,
  AddRoom,
  AdminPaymentHistory,
  AdminProfile,
  AllRoomInfo,
  DashNav,
  EditMemberProfile,
  Maintenance,
  MaintenanceTable,
  MemberPaymentHistory,
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
        <div className="hero-content flex-col lg:flex-row-reverse w-full overflow-hidden">
          <div className="text-center lg:text-left">
            <Routes>
              <Route path="/" element={<MemberProfile />} />
              <Route
                path="/editmember"
                element={<EditMemberProfile userId="01" />}
              />
              <Route path="/roominfo/*" element={<AllRoomInfo />} />
              <Route path="/addroom" element={<AddRoom />} />
              <Route
                path="/paymenthistory/*"
                element={<MemberPaymentHistory />}
              />
              <Route path="/addpayment" element={<AddPaymentAdmin />} />
              <Route path="/maintenance/*" element={<MaintenanceTable />} />
              <Route path="/addmaintenance" element={<AddMaintenance />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
