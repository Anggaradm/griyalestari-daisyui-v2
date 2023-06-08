import React, { useState } from "react";
import { Link } from "react-router-dom";

const EditRoom = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeNumber = (e) => {
    setNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, number });
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center pt-12">Edit Kamar</h1>
      <div className="py-6 flex flex-col items-center w-screen px-6 lg:w-full">
        <form
          action=""
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
            <Link
              to="/dashboard/roominfo"
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

export default EditRoom;
