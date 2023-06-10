import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const FinancialsBook = () => {
  const [category, setCategory] = useState("");

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
    if (user && user.userStatus !== "admin") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [financials, setFinancials] = useState([]);

  useEffect(() => {
    getFinancials();
  }, []);

  useEffect(() => {
    console.log(financials);
  }, [financials]);

  const getFinancials = async () => {
    const response = await axios.get(`${serverUrl}/financials`);
    setFinancials(response.data);
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center pt-12">
        Catatan Keuangan
      </h1>
      <h2 className="text-xl font-medium mb-4 text-center">{category}</h2>
      <div className="py-6 flex flex-col items-center lg:items-start w-screen px-6 lg:w-full">
        <div className="btn-group pt-4 pb-12 flex flex-wrap">
          <button
            onClick={() => setCategory("")}
            className="btn btn-ghost underline underline-offset-2"
          >
            Semua
          </button>
          <button
            onClick={() => setCategory("Hari ini")}
            className="btn btn-ghost underline underline-offset-2"
          >
            Hari ini
          </button>
          <button
            onClick={() => setCategory("Minggu ini")}
            className="btn btn-ghost underline underline-offset-2"
          >
            Minggu ini
          </button>
          <button
            onClick={() => setCategory("Minggu lalu")}
            className="btn btn-ghost underline underline-offset-2"
          >
            Minggu lalu
          </button>
          <button
            onClick={() => setCategory("Bulan ini")}
            className="btn btn-ghost underline underline-offset-2"
          >
            Bulan ini
          </button>
        </div>
        <div className="w-full flex flex-col gap-10">
          <div className="w-full">
            <div className="my-2">
              <h3>Profit</h3>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="table table-zebra table-pin-cols table-pin-rows md:table-pin-rows">
                {/* head */}
                <thead>
                  <tr>
                    <td>Pendapatan</td>
                    <td className="text-accent">
                      + {currency(financials.income)}
                    </td>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <td>Pengeluaran</td>
                    <td className="text-error">
                      - {currency(financials.outcome)}
                    </td>
                  </tr>
                </thead>
                <thead>
                  <tr
                    className={`text-base-100 lg:text-base-100 ${currency(
                      financials.balance >= 0
                        ? "bg-accent lg:bg-accent"
                        : "bg-error lg:bg-error"
                    )}`}
                  >
                    <td>Total Pendapatan</td>
                    <td>
                      {financials.balance >= 0 ? "+" : ""}{" "}
                      {currency(financials.balance)}
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div className="w-full">
            <div className="my-2">
              <h3>Detail Pemasukan</h3>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="table table-zebra table-pin-cols table-pin-rows md:table-pin-rows">
                {/* head */}
                <thead>
                  <tr>
                    <td></td>
                    <td>Kamar</td>
                    <td>Tanggal</td>
                    <td>Nominal</td>
                  </tr>
                </thead>
                <tbody>
                  {/* row mapping */}
                  {financials?.paymentData?.map((payment, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {payment.roomId?.roomNumber}
                        {payment.roomId?.roomTag}
                      </td>
                      <td>{payment.createdAt}</td>
                      <td>{currency(payment.price)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="text-accent">
                    <td colSpan="3">Total</td>
                    <td>Rp 300000</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div className="w-full">
            <div className="my-2">
              <h3>Detail Pengeluaran</h3>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="table table-zebra table-pin-cols table-pin-rows md:table-pin-rows">
                {/* head */}
                <thead>
                  <tr>
                    <td></td>
                    <td>Keterangan</td>
                    <td>Tanggal</td>
                    <td>Biaya</td>
                  </tr>
                </thead>
                <tbody>
                  {/* row mapping */}
                  {financials?.maintenanceData?.map((maintenance, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {maintenance.mtType === "newBuy"
                          ? "Membeli"
                          : maintenance.mtType === "repair"
                          ? "Perbaikan"
                          : ""}{" "}
                        {maintenance.mtName}
                      </td>
                      <td>{maintenance.mtDate}</td>
                      <td>{currency(maintenance.mtCost)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="text-error">
                    <td colSpan="3">Total</td>
                    <td>{currency(financials.outcome)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
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

export default FinancialsBook;
