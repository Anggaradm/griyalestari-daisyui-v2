import React from "react";
import * as Icon from "react-feather";
import { Link, Route, Routes } from "react-router-dom";
import EditMaintenance from "./EditMaintenance";

const MaintenanceTable = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("delete");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1 className="text-4xl font-bold mb-4 text-center pt-12">
              Edit Pengeluaran
            </h1>
            <Link
              to="/dashboard/addmaintenance"
              className="mx-6 mt-12 btn btn-primary"
            >
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
                      <th>Nama</th>
                      <th>Tanggal</th>
                      <th>Biaya</th>
                      <th>Pilihan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <th>1</th>
                      <th>Membeli lampu</th>
                      <td>27-5-2023</td>
                      <td>Rp 600.000</td>
                      <td>
                        <form action="" onSubmit={handleSubmit}>
                          <div className="flex gap-2">
                            <Link
                              to={`/dashboard/maintenance/wefnewfe7`}
                              className="btn btn-sm btn-ghost btn-outline text-xs font-normal"
                            >
                              Edit
                            </Link>
                            <button
                              type="submit"
                              className="btn btn-sm btn-error btn-outline text-xs font-normal"
                            >
                              Hapus
                            </button>
                          </div>
                        </form>
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
      <Route path="/:id" element={<EditMaintenance />} />
    </Routes>
  );
};

export default MaintenanceTable;
