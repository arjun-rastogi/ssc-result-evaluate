import React from "react";
import { SigninForm } from "./../../forms/";

const Signin = () => {
  return (
    <>
      <div className="container vh-100">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h5>Sign in for Existing User</h5>
          </div>
          <div className="col-md-6 offset-md-3">
            {/* Sign in Form  */}
            <SigninForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
