import React, { useRef, useState } from "react";

const AddPaymentMember = () => {
  const [image, setImage] = useState(null);
  const [isPopUp, setIsPopUp] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImgPreview(URL.createObjectURL(file));
    setIsPopUp(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(image);
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center">Tambah Pembayaran</h1>
      <div className="py-6 flex flex-col items-center w-screen px-6 lg:w-full">
        <form onSubmit={handleSubmit} className="form-control w-full max-w-xs">
          <label htmlFor="uploadFile" className="label">
            <span className="label-text">Upload bukti bayar</span>
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            id="uploadFile"
            className="file-input file-input-bordered w-full max-w-xs"
          />

          {imgPreview && (
            <img src={imgPreview} alt="uploaded" className="max-w-md mt-12" />
          )}
          <button
            type="submit"
            disabled={!isPopUp ? "disabled" : ""}
            className="btn btn-primary mt-24"
          >
            Kirim
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPaymentMember;
