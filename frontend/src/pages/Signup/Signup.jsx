import React from "react";
import { SignupForm } from "./../../forms/";

const Signup = () => {
  return (
    <>
      <div className="container vh-100">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h5>Sign up for New User</h5>
          </div>
          <div className="col-md-6 offset-md-3">
            {/* Sign up Form */}
            <SignupForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
