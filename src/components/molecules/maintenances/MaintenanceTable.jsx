import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
import EditMaintenance from "./EditMaintenance";

const MaintenanceTable = () => {
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

  useEffect(() => {
    if (user && user.userStatus !== "admin") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [maintenances, setMaintenances] = useState([]);

  useEffect(() => {
    getMaintenances();
  }, []);

  const getMaintenances = async () => {
    const response = await axios.get(`${serverUrl}/maintenances`);
    setMaintenances(response.data.datas);
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
                    {/* row mapping */}
                    {maintenances.map((maintenance, index) => (
                      <tr key={maintenance._id}>
                        <th>{index + 1}</th>
                        <th>
                          {maintenance.mtType === "newBuy"
                            ? "Membeli"
                            : maintenance.mtType === "repair"
                            ? "Perbaikan"
                            : ""}{" "}
                          {maintenance.mtName}
                        </th>
                        <td>{maintenance.mtDate}</td>
                        <td>{maintenance.mtCost}</td>
                        <td>
                          <form action="" onSubmit={handleSubmit}>
                            <div className="flex gap-2">
                              <Link
                                to={`/dashboard/maintenance/${maintenance._id}`}
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
      <Route path="/:id" element={<EditMaintenance />} />
    </Routes>
  );
};

export default MaintenanceTable;
