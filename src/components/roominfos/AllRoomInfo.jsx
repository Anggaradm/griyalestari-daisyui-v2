import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import EditRoom from "./EditRoom";

const AllRoomInfo = () => {
  const [roomTag, setRoomTag] = useState("");
  const [roomTags, setRoomTags] = useState([]);

  const handleRoomTag = (e) => {
    setRoomTag(e.target.value);
  };

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
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    const response = await axios.get(`${serverUrl}/rooms`);
    const datas = response.data;
    setRooms(datas);

    const roomTags = datas?.map((room) => room.roomTag);
    const uniqueRoomTags = [...new Set(roomTags)];
    setRoomTags(uniqueRoomTags);
    setRoomTag(uniqueRoomTags[0]);
  };

  const deleteRoom = async (id) => {
    await axios.delete(`${serverUrl}/rooms/${id}`);
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
                      <th>Kamar</th>
                      <th>Jumlah penghuni</th>
                      <th>Tagihan</th>
                      <th className="text-center">Pilihan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row mapping */}
                    {rooms
                      ?.filter((room) => room.roomTag === roomTag)
                      .sort((a, b) => a.roomNumber - b.roomNumber)
                      .map((room, index) => (
                        <tr key={room._id}>
                          <th>
                            {room.roomNumber}
                            {room.roomTag}
                          </th>
                          <td className={`${room.isEmpty && "italic text-xs"}`}>
                            {!room.isEmpty
                              ? room.userId?.length
                              : "kamar kosong"}
                          </td>
                          <td>{currency(room.price)}</td>
                          <td>
                            <div>
                              <div className="flex gap-2">
                                <Link
                                  to={`/dashboard/roominfo/${room._id}`}
                                  className="btn btn-sm btn-ghost btn-outline text-xs font-normal"
                                >
                                  Edit
                                </Link>
                                <label
                                  htmlFor="my_modal_6"
                                  className="btn btn-sm btn-error btn-outline text-xs font-normal"
                                >
                                  Hapus
                                </label>

                                {/* The button to open modal */}

                                {/* Put this part before </body> tag */}
                                <input
                                  type="checkbox"
                                  id="my_modal_6"
                                  className="modal-toggle"
                                />
                                <div className="modal">
                                  <div className="modal-box">
                                    <h3 className="font-bold text-lg text-warning flex items-center gap-1">
                                      <Icon.AlertCircle size={20} /> Peringatan
                                    </h3>
                                    <p className="py-4">
                                      Anda yakin ingin menghapus kamar{" "}
                                      {room.roomNumber + room.roomTag}?
                                    </p>
                                    <div className="modal-action">
                                      <label
                                        htmlFor="my_modal_6"
                                        className="btn btn-outline"
                                      >
                                        Tidak
                                      </label>
                                      <button
                                        className="btn"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          deleteRoom(room._id);
                                          getRooms();
                                        }}
                                      >
                                        Ya
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="btn-group btn-group-horizontal mt-12">
                {roomTags?.map((roomTag, index) => (
                  <button
                    key={index}
                    onClick={handleRoomTag}
                    value={roomTag}
                    className="btn btn-outline"
                  >
                    {roomTag}
                  </button>
                ))}
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
