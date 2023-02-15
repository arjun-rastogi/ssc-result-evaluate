import React from 'react';
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import AuthRoute from './authRoute';
import UserRoute from './userRoute';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export default function RootNavigation(){
    return (
        <>
        <Navbar />
           <UserRoute />
           <AuthRoute />
        <Footer />
        </>
    )
};

