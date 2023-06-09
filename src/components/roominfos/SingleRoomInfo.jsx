import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const SingleRoomInfo = () => {
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
    if (user && user.userStatus !== "member") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [room, setRoom] = useState({});

  useEffect(() => {
    getRoom();
  }, []);

  // useEffect(() => {
  //   console.log(room);
  // }, [room]);

  const getRoom = async () => {
    const response = await axios.get(`${serverUrl}/rooms/member/${user._id}`);
    setRoom(response.data[0]);
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center pt-12">
        {room.roomNumber}
        {room.roomTag}
      </h1>
      <div className="py-6 flex flex-col items-center">
        <div className="stats stats-vertical lg:stats-horizontal bg-base-100 text-primary-content">
          <div className="stat flex flex-col gap-2">
            <div>
              <div className="stat-title">Tanggal Masuk</div>
              <div className="stat-value text-lg font-medium">
                noted-belum ada
              </div>
            </div>
            <div>
              <div className="stat-title">Jumlah Penghuni</div>
              <div className="stat-value text-lg font-medium">
                {room.userId?.length}
              </div>
            </div>
            <div>
              <div className="stat-title">Tagihan</div>
              <div className="stat-value text-lg font-medium">{room.price}</div>
            </div>
          </div>

          <div className="stat">
            <div className="flex flex-col justify-center">
              <div className="stat-title">Tenggat waktu</div>
              <div className="stat-value text-xl font-medium">2 hari lagi</div>
              <div className="stat-actions">
                <button className="btn btn-sm">Bayar Sekarang</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleRoomInfo;
