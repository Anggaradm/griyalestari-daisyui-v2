import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import EditPaymentMember from "./EditPaymentMember";

const MemberPaymentHistory = () => {
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
                    {/* row 1 */}
                    <tr>
                      <th>1</th>
                      <th>1A</th>
                      <td>27-5-2023</td>
                      <td>Rp 600.000</td>
                      <td>
                        <div className="flex gap-2">
                          <Link className="btn btn-sm btn-ghost btn-outline text-xs font-normal">
                            Cetak
                          </Link>
                          <Link
                            to={`/dashboard/paymenthistory/wnvrnv7`}
                            className="btn btn-sm btn-ghost btn-outline text-xs font-normal"
                          >
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
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
