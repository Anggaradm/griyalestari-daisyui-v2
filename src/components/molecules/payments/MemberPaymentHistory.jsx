import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import EditPaymentMember from "./EditPaymentMember";

const MemberPaymentHistory = () => {
  // consumeAPI
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/dashboard");
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (user && user.userStatus !== "member") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    getPayments();
  }, []);

  useEffect(() => {
    console.log(payments);
  }, [payments]);

  const getPayments = async () => {
    const response = await axios.get(`${serverUrl}/payments/client`);
    setPayments(response.data.datas);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1 className="text-4xl font-bold mb-4 text-center pt-12">
              Riwayat Pembayaran
            </h1>
            <div className="py-6 flex flex-col items-center w-screen px-6 lg:w-full">
              <div className="overflow-x-auto w-full">
                <table className="table table-zebra table-pin-cols md:table-pin-rows">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Kamar</th>
                      <th>Tanggal</th>
                      <th>Nominal</th>
                      <th className="text-center">Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row mapping */}
                    {payments.map((payment, index) => (
                      <tr key={payment._id}>
                        <th>{index + 1}</th>
                        <th>
                          {payment.roomId.roomNumber}
                          {payment.roomId.roomNumber}
                        </th>
                        <td>{payment.createdAt}</td>
                        <td>{payment.price}</td>
                        <td>
                          <div className="flex gap-2">
                            <Link className="btn btn-sm btn-ghost btn-outline text-xs font-normal">
                              Cetak
                            </Link>
                            <Link
                              to={`/dashboard/paymenthistory/${payment._id}`}
                              className="btn btn-sm btn-ghost btn-outline text-xs font-normal"
                            >
                              Edit
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="join mt-12">
                <button className="join-item btn">«</button>
                <button className="join-item btn">Page 22</button>
                <button className="join-item btn">»</button>
              </div>
            </div>
          </>
        }
      />
      <Route path="/:id" element={<EditPaymentMember />} />
    </Routes>
  );
};

export default MemberPaymentHistory;
