import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { getMe, reset } from "../../features/authSlice";
import EditRoom from "./EditRoom";

const AllRoomInfo = () => {
  const [roomTag, setRoomTag] = useState("");
  const [roomTags, setRoomTags] = useState([]);
  const [modalRoom, setModalRoom] = useState({});
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const handleRoomTag = (e) => {
    setRoomTag(e.target.value);
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

  const getRooms = async () => {
    const response = await axios.get(`${serverUrl}/rooms`);
    const datas = response.data;
    setRooms(datas);

    const roomTags = datas?.map((room) => room.roomTag);
    const uniqueRoomTags = [...new Set(roomTags)];
    setRoomTags(uniqueRoomTags);
    setRoomTag(uniqueRoomTags[0]);
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

  const deleteRoom = async (id) => {
    try {
      const response = await axios.delete(`${serverUrl}/rooms/${id}`);
      setMessage(response.data.message);
      setStatus(response.status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRooms();
    if (status !== null && message === "") {
      setTimeout(() => {
        setMessage("");
        setStatus(null);
      }, 3000);
    }
  }, [status, message]);

  return (
    <>
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
                  {message && (
                    <div className="alert">
                      <Icon.AlertCircle size={20} />
                      <span
                        className={`${
                          status === 200 ? "text-accent" : "text-error"
                        }`}
                      >
                        {message}
                      </span>
                    </div>
                  )}
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
                            <td
                              className={`${room.isEmpty && "italic text-xs"}`}
                            >
                              {!room.isEmpty
                                ? room.userId?.length
                                : "kamar kosong"}
                            </td>
                            <td>{currency(room.price)}</td>
                            <td className="flex gap-1">
                              <Link
                                to={`/dashboard/roominfo/${room._id}`}
                                className="btn btn-sm btn-ghost btn-outline text-xs font-normal"
                              >
                                Edit
                              </Link>
                              <label
                                htmlFor="my_modal_6"
                                className="btn btn-sm btn-error btn-outline text-xs font-normal"
                                onClick={() => {
                                  setModalRoom({
                                    id: room._id,
                                    number: room.roomNumber,
                                    tag: room.roomTag,
                                  });
                                }}
                              >
                                Hapus
                              </label>
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

      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-warning flex items-center gap-1">
            <Icon.AlertCircle size={20} /> Peringatan
          </h3>
          <p className="py-4">
            Anda yakin ingin menghapus kamar {modalRoom?.number}
            {modalRoom?.tag}?
          </p>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn btn-outline">
              Tidak
            </label>
            <label
              htmlFor="my_modal_6"
              className="btn"
              onClick={(e) => {
                setMessage("");
                setStatus(null);
                deleteRoom(modalRoom?.id);
              }}
            >
              Ya
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllRoomInfo;
