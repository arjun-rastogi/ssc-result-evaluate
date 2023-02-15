import React, {useState, useEffect} from 'react';
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import AuthRoute from './authRoute';
import UserRoute from './userRoute';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from  'react-toastify';
import auth from '../services/authServices';
  


export default function RootNavigation(){
    const [user, setUser] = useState([]);

    useEffect(()=> {
        const user = auth.getCurrentUser();
        setUser(user);
    },[]);

    console.log("user", user);
    


    return (
        <>
        <ToastContainer />
        <Navbar user={user} />
        {user ?  <UserRoute /> :  <AuthRoute /> }
        <Footer />
        </>
    )
};

