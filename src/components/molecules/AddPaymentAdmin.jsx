import React, { useState } from "react";

const AddPaymentAdmin = () => {
  const [roomId, setRoomId] = useState("");

  const handleRoomId = (e) => {
    setRoomId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ roomId });
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center">Tambah Pembayaran</h1>
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
              Pick one
            </option>
            <option value="2A">2A</option>
          </select>
          <button type="submit" className="btn btn-primary mt-24">
            Kirim
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPaymentAdmin;
