import React, { useState } from "react";
import * as Icon from "react-feather";
import { Link, Route, Routes } from "react-router-dom";
import EditRoom from "./EditRoom";

const AllRoomInfo = () => {
  const [roomTag, setRoomTag] = useState("A");

  const handleRoomTag = (e) => {
    setRoomTag(e.target.value);
  };

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
              Informasi Kamar
            </h1>
            <Link
              to="/dashboard/addroom"
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
                      <th>Kamar</th>
                      <th>Jumlah penghuni</th>
                      <th>Tagihan</th>
                      <th className="text-center">Pilihan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <th>1</th>
                      <th>1{roomTag}</th>
                      <td>2 orang</td>
                      <td>Rp 600.000</td>
                      <td>
                        <form action="" onSubmit={handleSubmit}>
                          <div className="flex gap-2">
                            <Link
                              to={`/dashboard/roominfo/gnweignewi4`}
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
              <div className="btn-group btn-group-horizontal mt-12">
                <button
                  onClick={handleRoomTag}
                  value="A"
                  className="btn btn-outline"
                >
                  A
                </button>
                <button
                  onClick={handleRoomTag}
                  value="B"
                  className="btn btn-outline"
                >
                  B
                </button>
                <button
                  onClick={handleRoomTag}
                  value="C"
                  className="btn btn-outline"
                >
                  C
                </button>
              </div>
            </div>
          </>
        }
      />
      <Route path="/:id" element={<EditRoom />} />
    </Routes>
  );
};

export default AllRoomInfo;
