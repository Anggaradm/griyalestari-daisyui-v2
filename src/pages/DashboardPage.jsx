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
  PendingPayments,
  SingleRoomInfo,
  UserBooking,
} from "../components";
import { getMe } from "../features/authSlice";
import NotFoundPage from "./NotFoundPage";

const DashboardPage = () => {
  // consumeAPI
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      window.location.href = "/signin";
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
              <Route
                path="/"
                element={
                  user &&
                  (user.userStatus === "admin" ? (
                    <AdminProfile />
                  ) : (
                    <MemberProfile />
                  ))
                }
              />
              <Route path="/booking" element={<UserBooking />} />
              <Route path="/editmember" element={<EditMemberProfile />} />
              <Route
                path="/roominfo/*"
                element={
                  user &&
                  (user.userStatus === "admin" ? (
                    <AllRoomInfo />
                  ) : user.userStatus === "member" ? (
                    <SingleRoomInfo />
                  ) : (
                    <NotFoundPage />
                  ))
                }
              />
              <Route path="/addroom" element={<AddRoom />} />
              <Route
                path="/paymenthistory/*"
                element={
                  user &&
                  (user.userStatus === "admin" ? (
                    <AdminPaymentHistory />
                  ) : user.userStatus === "member" ? (
                    <MemberPaymentHistory />
                  ) : (
                    <NotFoundPage />
                  ))
                }
              />
              <Route
                path="/addpayment"
                element={
                  user &&
                  (user.userStatus === "admin" ? (
                    <AddPaymentAdmin />
                  ) : user.userStatus === "member" ? (
                    <AddPaymentMember />
                  ) : (
                    <NotFoundPage />
                  ))
                }
              />
              <Route path="/accpayment/*" element={<PendingPayments />} />
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
