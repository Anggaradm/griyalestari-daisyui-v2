import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const FinancialsBook = () => {
  const [category, setCategory] = useState("Hari ini");

  // consumeAPI
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.userStatus !== "admin") {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center pt-12">
        Catatan Keuangan
      </h1>
      <h2 className="text-xl font-medium mb-4 text-center">{category}</h2>
      <div className="py-6 flex flex-col items-center lg:items-start w-screen px-6 lg:w-full">
        <div className="btn-group pt-4 pb-12 flex flex-wrap">
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
                    <td className="text-accent">+ Rp 5000000</td>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <td>Pengeluaran</td>
                    <td className="text-error">- Rp 300000</td>
                  </tr>
                </thead>
                <thead>
                  <tr className="bg-accent text-base-100 lg:bg-accent lg:text-base-100">
                    <td>Total Pendapatan</td>
                    <td>+Rp 200000</td>
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
                  <tr>
                    <td>1</td>
                    <td>10B</td>
                    <td>26-2-2023</td>
                    <td>Rp 300000</td>
                  </tr>
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
                  <tr>
                    <td>1</td>
                    <td>10B</td>
                    <td>26-2-2023</td>
                    <td>Rp 300000</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="text-error">
                    <td colSpan="3">Total</td>
                    <td>Rp 300000</td>
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
