import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const EditRoom = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const [isEditSuccess, setIsEditSuccess] = useState(false);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeNumber = (e) => {
    setNumber(e.target.value);
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
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [isRoomEmpty, setIsRoomEmpty] = useState(false);

  useEffect(() => {
    getRoom();
  }, []);

  const getRoom = async () => {
    const response = await axios.get(`${serverUrl}/rooms/${id}`);
    const data = response.data;
    setName(data.roomTag);
    setNumber(data.roomNumber);
    if (data.userId.length === 0) {
      setIsRoomEmpty(true);
    }
  };

  const updateRoom = async (id) => {
    await axios
      .patch(`${serverUrl}/rooms/${id}`, {
        newRoomTag: name,
        newRoomNumber: number,
      })
      .then((res) => {
        setStatus(res.status);
        setMessage(res.data.message);
        setIsEditSuccess(true);
      })
      .catch((err) => {
        setStatus(err.response.status);
        setMessage(err.response.data.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ name, number });
    updateRoom(id);
  };

  useEffect(() => {
    if (status === 200) {
      getRoom();
    }
    setTimeout(() => {
      setMessage("");
      setStatus(null);
    }, 3000);
  }, [status]);

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center pt-12">Edit Kamar</h1>
      <div className="py-6 flex flex-col items-center w-screen px-6 lg:w-full">
        {message && (
          <div className="alert">
            <Icon.AlertCircle size={20} />
            <span
              className={`${status !== 200 ? "text-error" : "text-accent"}`}
            >
              {message}
            </span>
          </div>
        )}

        <div className="flex gap-2 w-full">
          <Link
            to={`/dashboard/roominfo/addusertoroom/${id}`}
            className="btn btn-sm btn-ghost btn-outline text-xs font-normal"
          >
            <Icon.PlusCircle size={18} />
            Tambah user
          </Link>
          {!isRoomEmpty && (
            <Link
              to={`/dashboard/roominfo/deleteuserfromroom/${id}`}
              className="btn btn-sm btn-ghost btn-outline text-xs font-normal"
            >
              <Icon.MinusCircle size={18} />
              Hapus user
            </Link>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <div className="form-control w-full max-w-xs">
            <label htmlFor="nameInput" className="label">
              <span className="label-text">Nama Kamar</span>
            </label>
            <input
              type="text"
              placeholder="nama kamar..."
              id="nameInput"
              onChange={handleChangeName}
              value={name}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="numberInput" className="label">
              <span className="label-text">Nomor</span>
            </label>
            <input
              type="number"
              placeholder="0"
              id="numberInput"
              onChange={handleChangeNumber}
              value={number}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="mt-12 w-full flex flex-col items-center">
            <button type="submit" className="btn btn-primary w-full max-w-xs">
              Kirim
            </button>
            <button
              type="button"
              onClick={() => {
                window.location.replace("/dashboard/roominfo");
              }}
              className="btn btn-outline mt-2 w-full max-w-xs"
            >
              {isEditSuccess ? "Kembali" : "Batal"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditRoom;
