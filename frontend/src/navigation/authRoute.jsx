import React from "react";
import { Home, Signin, Signup, Error } from "./../pages/";
import { Routes, Route } from "react-router-dom";

const AuthRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </>
  );
};

export default AuthRoute;
