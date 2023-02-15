import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Logout from '../common/logout';
import Dashboard from './../pages/Dashboard';
import Error from './../pages/Error';

const UserRoute = () => {
  return (
    <>
    <Routes>
        <Route path="*" element={<Error />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/logout' element={<Logout />} />
    </Routes>
    </>
  )
}

export default UserRoute