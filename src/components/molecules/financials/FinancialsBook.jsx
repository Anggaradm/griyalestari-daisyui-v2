import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const FinancialsBook = () => {
  const [category, setCategory] = useState("");

  // currency
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
  const [apiEndPoint, setApiEndPoint] = useState("");

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
  }, [apiEndPoint]);

  const getFinancials = async () => {
    const response = await axios.get(`${serverUrl}/financials${apiEndPoint}`);
    setFinancials(response.data);
  };

  // ########pagination########
  const [currentPagePayments, setCurrentPagePayments] = useState(1);
  const [currentPageMaintenances, setCurrentPageMaintenances] = useState(1);
  const [currentPageBookings, setCurrentPageBookings] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // jumlah item per page
  // inisialisasi data array
  const paymentsData = financials?.paymentData;
  const maintenancesData = financials?.maintenanceData;
  const bookingsData = financials?.bookingPaymentData;

  // menghitung total page
  const totalPagePayments = Math.ceil(paymentsData?.length / itemsPerPage);
  const totalPageMaintenances = Math.ceil(
    maintenancesData?.length / itemsPerPage
  );
  const totalPageBookings = Math.ceil(bookingsData?.length / itemsPerPage);

  // mengambil data halaman saat ini
  const indexOfLastItemPayments = currentPagePayments * itemsPerPage;
  const indexOfFirstItemPayments = indexOfLastItemPayments - itemsPerPage;
  const currentItemsPayments = paymentsData?.slice(
    indexOfFirstItemPayments,
    indexOfLastItemPayments
  );

  const indexOfLastItemMaintenances = currentPageMaintenances * itemsPerPage;
  const indexOfFirstItemMaintenances =
    indexOfLastItemMaintenances - itemsPerPage;
  const currentItemsMaintenances = maintenancesData?.slice(
    indexOfFirstItemMaintenances,
    indexOfLastItemMaintenances
  );

  const indexOfLastItemBookings = currentPageBookings * itemsPerPage;
  const indexOfFirstItemBookings = indexOfLastItemBookings - itemsPerPage;
  const currentItemsBookings = bookingsData?.slice(
    indexOfFirstItemBookings,
    indexOfLastItemBookings
  );

  // previous page
  const prevPagePayments = (pageNumber) => {
    setCurrentPagePayments((pageNumber) => pageNumber - 1);
  };
  const prevPageMaintenances = (pageNumber) => {
    setCurrentPageMaintenances((pageNumber) => pageNumber - 1);
  };
  const prevPageBookings = (pageNumber) => {
    setCurrentPageBookings((pageNumber) => pageNumber - 1);
  };

  // next page
  const nextPagePayments = (pageNumber) => {
    setCurrentPagePayments((pageNumber) => pageNumber + 1);
  };
  const nextPageMaintenances = (pageNumber) => {
    setCurrentPageMaintenances((pageNumber) => pageNumber + 1);
  };
  const nextPageBookings = (pageNumber) => {
    setCurrentPageBookings((pageNumber) => pageNumber + 1);
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
            onClick={() => {
              setCategory("");
              setApiEndPoint("");
            }}
            className="btn btn-ghost underline underline-offset-2"
          >
            Semua
          </button>
          <button
            onClick={() => {
              setCategory("Hari ini");
              setApiEndPoint("/today");
            }}
            className="btn btn-ghost underline underline-offset-2"
          >
            Hari ini
          </button>
          <button
            onClick={() => {
              setCategory("Minggu ini");
              setApiEndPoint("/week");
            }}
            className="btn btn-ghost underline underline-offset-2"
          >
            Minggu ini
          </button>
          <button
            onClick={() => {
              setCategory("Minggu lalu");
              setApiEndPoint("/last-week");
            }}
            className="btn btn-ghost underline underline-offset-2"
          >
            Minggu lalu
          </button>
          <button
            onClick={() => {
              setCategory("Bulan ini");
              setApiEndPoint("/month");
            }}
            className="btn btn-ghost underline underline-offset-2"
          >
            Bulan ini
          </button>
        </div>
        <div className="w-full flex flex-col gap-10">
          <div className="w-full">
            {financials?.income === 0 && financials?.outcome === 0 ? (
              <div className="alert text-warning">
                <Icon.AlertCircle size={20} />
                <span>Tidak Ada Catatan {category}</span>
              </div>
            ) : (
              ""
            )}
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
                      + {currency(financials?.income)}
                    </td>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <td>Pengeluaran</td>
                    <td className="text-error">
                      - {currency(financials?.outcome)}
                    </td>
                  </tr>
                </thead>
                <thead>
                  <tr
                    className={`text-base-100 lg:text-base-100 ${currency(
                      financials?.balance >= 0
                        ? "bg-accent lg:bg-accent"
                        : "bg-error lg:bg-error"
                    )}`}
                  >
                    <td>Total Pendapatan</td>
                    <td>
                      {financials?.balance >= 0 ? "+" : ""}{" "}
                      {currency(financials?.balance)}
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>

          {/* pemasukan */}
          <div className="w-full">
            <div className="my-2">
              <h3>Detail Pemasukan</h3>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="table table-zebra table-pin-cols table-pin-rows md:table-pin-rows">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <td>Kamar</td>
                    <td>Tanggal</td>
                    <th>Nominal</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row mapping */}
                  {currentItemsPayments
                    ?.sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    ?.map((payment, index) => (
                      <tr key={index}>
                        <th>
                          {index + 1 + (currentPagePayments - 1) * itemsPerPage}
                        </th>
                        <td>{payment.roomName}</td>
                        <td>{payment.createdAt?.toString().slice(0, 10)}</td>
                        <th>{currency(payment.price)}</th>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr className="text-accent">
                    <th colSpan="3">Total</th>
                    <th>{currency(financials.totalPaymentCost)}</th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="join mt-1">
              <button
                onClick={prevPagePayments}
                className="join-item btn"
                disabled={currentPagePayments === 1}
              >
                «
              </button>
              <button className="join-item btn">
                halaman {currentPagePayments}
              </button>
              <button
                onClick={nextPagePayments}
                className="join-item btn"
                disabled={
                  currentPagePayments === totalPagePayments ||
                  totalPagePayments === 0
                    ? "disabled"
                    : ""
                }
              >
                »
              </button>
            </div>
          </div>

          {/* pembayaran booking */}
          <div className="w-full">
            <div className="my-2">
              <h3>Detail Pembayaran Booking</h3>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="table table-zebra table-pin-cols table-pin-rows md:table-pin-rows">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <td>Kamar</td>
                    <td>Tanggal</td>
                    <th>Nominal</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row mapping */}
                  {currentItemsBookings
                    ?.sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    ?.map((booking, index) => (
                      <tr key={index}>
                        <th>
                          {index + 1 + (currentPageBookings - 1) * itemsPerPage}
                        </th>
                        <td>{booking.roomName}</td>
                        <td>{booking.createdAt?.toString().slice(0, 10)}</td>
                        <th>{currency(booking.price)}</th>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr className="text-accent">
                    <th colSpan="3">Total</th>
                    <th>{currency(financials.totalBookingPaymentCost)}</th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="join mt-1">
              <button
                onClick={prevPageBookings}
                className="join-item btn"
                disabled={currentPageBookings === 1}
              >
                «
              </button>
              <button className="join-item btn">
                halaman {currentPageBookings}
              </button>
              <button
                onClick={nextPageBookings}
                className="join-item btn"
                disabled={
                  currentPageBookings === totalPageBookings ||
                  totalPageBookings === 0
                    ? "disabled"
                    : ""
                }
              >
                »
              </button>
            </div>
          </div>

          {/* pengeluaran */}
          <div className="w-full">
            <div className="my-2">
              <h3>Detail Pengeluaran</h3>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="table table-zebra table-pin-cols table-pin-rows md:table-pin-rows">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <td>Keterangan</td>
                    <td>Tanggal</td>
                    <th>Biaya</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row mapping */}
                  {currentItemsMaintenances
                    ?.sort((a, b) => new Date(b.mtDate) - new Date(a.mtDate))
                    .map((maintenance, index) => (
                      <tr key={index}>
                        <th>
                          {index +
                            1 +
                            (currentPageMaintenances - 1) * itemsPerPage}
                        </th>
                        <td>
                          {maintenance.mtType === "newBuy"
                            ? "Membeli"
                            : maintenance.mtType === "repair"
                            ? "Perbaikan"
                            : ""}{" "}
                          {maintenance.mtName}
                        </td>
                        <td>{maintenance.mtDate?.toString().slice(0, 10)}</td>
                        <th>{currency(maintenance.mtCost)}</th>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr className="text-error">
                    <th colSpan="3">Total</th>
                    <th>{currency(financials.outcome)}</th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="join mt-1">
              <button
                onClick={prevPageMaintenances}
                className="join-item btn"
                disabled={currentPageMaintenances === 1}
              >
                «
              </button>
              <button className="join-item btn">
                halaman {currentPageMaintenances}
              </button>
              <button
                onClick={nextPageMaintenances}
                className="join-item btn"
                disabled={
                  currentPageMaintenances === totalPageMaintenances ||
                  totalPageMaintenances === 0
                    ? "disabled"
                    : ""
                }
              >
                »
              </button>
            </div>
          </div>
        </div>
        <Link
          target="_blank"
          to="/print-financial-report"
          className="btn btn-ghost btn-outline mt-12"
        >
          Cetak Laporan Keuangan
        </Link>
      </div>
    </>
  );
};

export default FinancialsBook;
