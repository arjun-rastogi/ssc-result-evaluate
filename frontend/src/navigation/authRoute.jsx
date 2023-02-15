import React from 'react'
import Home from './../pages/Home';
import Signin from './../pages/Signin';
import Signup from './../pages/Signup';
import {Routes, Route} from 'react-router-dom';
import Error from './../pages/Error';

const AuthRoute = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path="*" element={<Error />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
    </Routes>
    </>
  )
}

export default AuthRoute