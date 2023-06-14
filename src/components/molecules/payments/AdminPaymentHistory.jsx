import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const AdminPaymentHistory = () => {
  const [selectedRoom, setSelectedRoom] = useState({});
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

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
    const datas = response.data.datas?.filter(
      (data) => data.status === "accept"
    );
    setPayments(datas);
  };

  const deletePayment = async (id) => {
    await axios
      .delete(`${serverUrl}/payments/${id}`)
      .then((res) => {
        setMessage(res.data.message);
        setStatus(res.status);
        getPayments();
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setStatus(err.response.status);
      });
  };

  useEffect(() => {
    if (status !== null && message !== "") {
      setTimeout(() => {
        setMessage("");
        setStatus(null);
      }, 3000);
    }
  }, [status, message]);

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
      <div className="flex">
        <Link to="/dashboard/addpayment" className="mx-6 mt-12 btn btn-primary">
          Tambah Data
          <Icon.PlusCircle size={20} />
        </Link>
        <Link
          to="/dashboard/accpayment"
          className="mx-6 mt-12 btn btn-ghost btn-outline"
        >
          <Icon.AlertCircle size={20} />
          Menunggu persetujuan
        </Link>
      </div>
      <div className="py-6 flex flex-col items-center w-screen px-6 lg:w-full">
        <div className="overflow-x-auto w-full">
          {message && (
            <div className="alert">
              <Icon.AlertCircle size={20} />
              <span
                className={`${status === 200 ? "text-accent" : "text-error"}`}
              >
                {message}
              </span>
            </div>
          )}
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
                    <th>{payment.roomName}</th>
                    <td>{payment.createdAt?.toString().slice(0, 10)}</td>
                    <td>{currency(payment.price)}</td>
                    <td>
                      <div className="flex">
                        <label
                          onClick={() =>
                            setSelectedRoom({
                              id: payment._id,
                              roomName: payment.roomName,
                              date: payment.createdAt?.toString().slice(0, 10),
                            })
                          }
                          htmlFor="my_modal_6"
                          className="btn btn-sm btn-error btn-outline text-xs font-normal"
                        >
                          hapus
                        </label>
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
      {/* The button to open modal */}
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-warning flex items-center gap-1">
            <Icon.AlertCircle size={20} /> Peringatan
          </h3>
          <p className="py-4">
            Anda yakin ingin menghapus pembayaran dari kamar{" "}
            {selectedRoom?.roomName} dengan tanggal
            {" " + currency(selectedRoom?.date)}?
          </p>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">
              Tidak
            </label>
            <label
              onClick={() => {
                deletePayment(selectedRoom?.id);
              }}
              htmlFor="my_modal_6"
              className="btn"
            >
              Ya
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPaymentHistory;
