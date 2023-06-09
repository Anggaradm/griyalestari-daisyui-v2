import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const AddPaymentAdmin = () => {
  const [roomId, setRoomId] = useState("");

  const handleRoomId = (e) => {
    setRoomId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ roomId });
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
    setRooms(response.data);
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center pt-12">
        Tambah Pembayaran
      </h1>
      <div className="py-6 flex flex-col items-center w-screen px-6 lg:w-full">
        <form onSubmit={handleSubmit} className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Pilih kamar</span>
          </label>
          <select
            defaultValue=""
            onChange={handleRoomId}
            className="select select-bordered"
          >
            <option disabled value="">
              Pilih kamar
            </option>
            {rooms.map((room) => (
              <option key={room._id} value={room._id}>
                {room.roomNumber}
                {room.roomTag}
              </option>
            ))}
          </select>
          <button
            disabled={!roomId ? "disabled" : ""}
            type="submit"
            className="btn btn-primary mt-24"
          >
            Kirim
          </button>
          <Link
            to="/dashboard/paymenthistory"
            className="btn btn-error btn-outline mt-2"
          >
            Batal
          </Link>
        </form>
      </div>
    </>
  );
};

export default AddPaymentAdmin;
