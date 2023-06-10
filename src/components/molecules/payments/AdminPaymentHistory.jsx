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

  // useEffect(() => {
  //   console.log(payments);
  // }, [payments]);

  const getPayments = async () => {
    const response = await axios.get(`${serverUrl}/payments`);

    setPayments(
      response.data.datas?.filter((payment) => payment.status === "pending")
    );
  };

  //currency
  const currency = (price) => {
    // Menambahkan format rupiah dengan opsi lain
    if (price) {
      const formatted = price.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      return formatted;
    }
    return "Rp 0";
  };

  // #######pagination########
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const totalPages = Math.ceil(payments?.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paymentItems = payments?.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = (pageNumber) => {
    setCurrentPage((pageNumber) => pageNumber + 1);
  };

  const handlePrevPage = (pageNumber) => {
    setCurrentPage((pageNumber) => pageNumber - 1);
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
              {paymentItems
                ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((payment, index) => (
                  <tr key={payment._id}>
                    <th>{index + 1 + (currentPage - 1) * itemsPerPage}</th>
                    <th>
                      {payment.roomId.roomNumber + payment.roomId.roomTag}
                    </th>
                    <td>{payment.createdAt?.toString().slice(0, 10)}</td>
                    <td>{currency(payment.price)}</td>
                    <td>
                      <div>
                        <div className="flex">
                          <button
                            type="submit"
                            className="btn btn-sm btn-ghost btn-outline text-xs font-normal"
                          >
                            Lihat Bukti Bayar
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
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="join-item btn"
          >
            «
          </button>
          <button className="join-item btn">halaman {currentPage}</button>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="join-item btn"
          >
            »
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminPaymentHistory;
