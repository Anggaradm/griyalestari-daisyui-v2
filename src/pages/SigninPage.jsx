import React from "react";
import { Copyright, SigninForm } from "../components";

const SigninPage = () => {
  return (
    <>
      <div className="w-screen">
        <SigninForm />
        <Copyright />
      </div>
    </>
  );
};

export default SigninPage;
