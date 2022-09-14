import React from "react"
import { Navigate, Route } from "react-router-dom";
import Home from "../containers/Home/Home";
import { auth } from "../firebase/firebase";

interface IPrivateRouteState {
    children: JSX.Element;
}


const PrivateRoute = () => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || ""): null

    return user ? <Home/> : <Navigate to="/login" /> 
};

export default PrivateRoute;