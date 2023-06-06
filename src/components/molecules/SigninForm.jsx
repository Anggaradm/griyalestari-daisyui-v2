import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as image from "../../assets";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };
  return (
    <>
      <div className="w-screen">
        <div className="py-[4%] px-[6%] flex flex-col items-center gap-12">
          <div className="text-2xl lg:text-4xl font-bold">Signin</div>

          <form action="" onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs">
              <label htmlFor="emailInput" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="masukkan email anda..."
                id="emailInput"
                onChange={handleChangeEmail}
                value={email}
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label htmlFor="passwordInput" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="masukkan password anda..."
                id="passwordInput"
                onChange={handleChangePassword}
                value={password}
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="mt-12">
              <button type="submit" className="btn btn-primary w-full max-w-xs">
                Masuk
              </button>
              <span className="text-xs text-center flex gap-1 justify-center mt-2">
                Belum punya akun?
                <Link to="/signup" className="text-accent">
                  Daftar
                </Link>
              </span>
            </div>
          </form>

          <Link
            to="/"
            className="flex flex-col items-center gap-2 lg:gap-4 mt-24"
          >
            <img src={image.BlackLogo} alt="company logo" className="w-10" />
            <div className="font-bold">
              Griya
              <span className="text-primary">Lestari</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SigninForm;
