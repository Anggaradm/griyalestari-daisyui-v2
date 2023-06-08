import React, { useState } from "react";
import { Link } from "react-router-dom";

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
            <option value="2A">2A</option>
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
