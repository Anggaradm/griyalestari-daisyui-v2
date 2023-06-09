import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const EditMemberProfile = ({ userId }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleChangeCompany = (e) => {
    setCompany(e.target.value);
  };

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, phone, company, address });
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

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center pt-12">
        Edit Member Profile
      </h1>
      <div className="py-6 flex flex-col items-center">
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <div className="form-control w-full max-w-xs">
            <label htmlFor="nameInput" className="label">
              <span className="label-text">Nama</span>
            </label>
            <input
              type="text"
              id="nameInput"
              onChange={handleChangeName}
              value={name}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="phoneInput" className="label">
              <span className="label-text">Nomor Hp</span>
            </label>
            <input
              type="number"
              id="phoneInput"
              onChange={handleChangePhone}
              value={phone}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="companyInput" className="label">
              <span className="label-text">Tempat Kerja</span>
            </label>
            <input
              type="text"
              id="companyInput"
              onChange={handleChangeCompany}
              value={company}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="addressInput" className="label">
              <span className="label-text">Alamat</span>
            </label>
            <textarea
              id="addressInput"
              onChange={handleChangeAddress}
              value={address}
              required
              className="textarea textarea-bordered h-24"
            />
          </div>
          <div className="mt-12 w-full flex flex-col items-center gap-2">
            <button type="submit" className="btn btn-primary w-full max-w-xs">
              Kirim
            </button>
            <Link
              to="/dashboard"
              className="btn btn-ghost btn-outline w-full max-w-xs"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

EditMemberProfile.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default EditMemberProfile;
