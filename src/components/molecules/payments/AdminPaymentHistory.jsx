import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const AdminPaymentHistory = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("delete");
  };

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

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    getPayments();
  }, []);

  const getPayments = async () => {
    const response = await axios.get(`${serverUrl}/payments`);
    setPayments(response.data.datas);
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center pt-12">
        Riwayat Pembayaran
      </h1>
      <Link to="/dashboard/addpayment" className="mx-6 mt-12 btn btn-primary">
        Tambah Data
        <Icon.PlusCircle size={20} />
      </Link>
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
                <th>Pilihan</th>
              </tr>
            </thead>
            <tbody>
              {/* row mapping */}
              {payments &&
                payments
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((payment, index) => (
                    <tr key={payment._id}>
                      <th>{index + 1}</th>
                      <th>
                        {payment.roomId.roomNumber + payment.roomId.roomTag}
                      </th>
                      <td>{payment.createdAt}</td>
                      <td>{payment.price}</td>
                      <td>
                        <div>
                          <div className="flex gap-2">
                            <Link className="btn btn-sm btn-ghost btn-outline text-xs font-normal">
                              Edit
                            </Link>
                            <button
                              type="submit"
                              className="btn btn-sm btn-error btn-outline text-xs font-normal"
                            >
                              Hapus
                            </button>
                          </div>
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
  );
};

export default AdminPaymentHistory;
