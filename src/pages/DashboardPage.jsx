import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
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
  FinancialsBook,
  Maintenance,
  MaintenanceTable,
  MemberPaymentHistory,
  MemberProfile,
  SingleRoomInfo,
} from "../components";
import { getMe } from "../features/authSlice";

const DashboardPage = () => {
  // consumeAPI
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/signin");
    }
  }, [isError, navigate]);

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
              <Route path="/financial" element={<FinancialsBook />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
