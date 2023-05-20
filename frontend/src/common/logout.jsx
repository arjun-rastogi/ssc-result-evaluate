import React, { useEffect } from "react";
import auth from "../services/authServices";

const Logout = () => {
  useEffect(() => {
    auth.logout();
    window.location = "/";
  });
  return null;
};

export default Logout;
