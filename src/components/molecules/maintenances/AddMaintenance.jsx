import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const AddMaintenance = () => {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [type, setType] = useState("newBuy");

  const today = new Date();
  const [date, setDate] = useState(today);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeCost = (e) => {
    setCost(e.target.value);
  };

  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };

  const handleChangeType = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, cost, date, type });
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

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center pt-12">
        Tambah Pengeluaran
      </h1>
      <div className="py-6 flex flex-col items-center w-screen px-6 lg:w-full">
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <div className="form-control w-full max-w-xs">
            <label htmlFor="nameInput" className="label">
              <span className="label-text">Nama Barang</span>
            </label>
            <input
              type="text"
              placeholder="nama barang..."
              id="nameInput"
              onChange={handleChangeName}
              value={name}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="costInput" className="label">
              <span className="label-text">Nominal</span>
            </label>
            <input
              type="number"
              placeholder="0"
              id="costInput"
              onChange={handleChangeCost}
              value={cost}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="dateInput" className="label">
              <span className="label-text">Tanggal</span>
            </label>
            <input
              type="date"
              id="dateInput"
              onChange={handleChangeDate}
              value={date}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Keterangan</span>
            </label>
            <select
              onChange={handleChangeType}
              className="select select-bordered"
            >
              <option value="newBuy">Beli baru</option>
              <option value="repair">Perbaikan</option>
            </select>
          </div>
          <div className="mt-12 w-full flex flex-col items-center">
            <button type="submit" className="btn btn-primary w-full max-w-xs">
              Kirim
            </button>
            <Link
              to="/dashboard/maintenance"
              className="btn btn-error btn-outline mt-2 w-full max-w-xs"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddMaintenance;
