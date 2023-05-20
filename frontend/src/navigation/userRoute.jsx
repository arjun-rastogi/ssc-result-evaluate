import React from "react";
import { Routes, Route } from "react-router-dom";
import Logout from "../common/logout";

import { Dashboard, Error } from "./../pages/";

const UserRoute = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
};

export default UserRoute;
