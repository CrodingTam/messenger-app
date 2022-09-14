import React from "react"
import { Navigate, Route } from "react-router-dom";
import Home from "../containers/Home/Home";
import { auth } from "../firebase/firebase";

interface IPrivateRouteState {
    children: JSX.Element;
}


const PrivateRoute:React.FC<IPrivateRouteState> = (props) => {
    console.log(auth)
    console.log(auth.currentUser?.displayName);
    return(
        auth.currentUser != null ? props.children : <Navigate to="/login"></Navigate>
    );
}

export default PrivateRoute;