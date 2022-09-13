import { getAuth, signInWithEmailAndPassword, signOut, UserCredential } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import { auth } from "../../firebase/firebase";
import { setEmail, setPassword } from "../../store/loginSlice";
import { RootState } from "../../store/store";
import { login, logout } from "../../store/userSlice";
import Card from "../Card/Card";
import "./styleLogin.css"

const Login = () => {
    const userEmail = useSelector((state:RootState) => state.login.email);
    const userPassword = useSelector((state:RootState) => state.login.password);
    const reduxDispatch = useDispatch();

    const loginToApp = (e: any) => {
        e.preventDefault();
         // Sign in an existing user with Firebase
        signInWithEmailAndPassword(auth, userEmail, userPassword)
        // returns  an auth object after a successful authentication
        // userAuth.user contains all our user details
        .then((userAuth: UserCredential) => {
            // store the user's information in the redux state
            reduxDispatch(login({
                email: userAuth.user.email,
                displayName: userAuth.user.displayName
            }));
            alert("You are logged in succesfully");
            window.location.pathname ="/";
        })
        // display the error if any
        .catch((err) => {
            alert(err);
        })
    }

    return(
        <Layout>
            <div className="loginContainer">
                <div className="brand-logo"></div>
                <div className="brand-title">Login</div>
                <Card>
                    <form>
                        <input 
                        name="email"
                        type="text" 
                        value={userEmail}
                        onChange={(e) => reduxDispatch(setEmail(e.target.value))}
                        placeholder="Email here"
                        />
                        <br/>
                        <input 
                        name="password"
                        type="password" 
                        value={userPassword}
                        onChange={(e) => reduxDispatch(setPassword(e.target.value))}
                        placeholder="Password here"
                        />
                        <br/>
                        <div className="loginIconContainer">
                            <i className='bx bxs-log-in-circle' id="loginIcon" onClick={loginToApp}></i>
                        </div>
                    </form>
                    <h5> 
                        Don't have account?
                        <br></br>
                        Create here:
                        <a href="/register" onClick={() => {
                            reduxDispatch(logout());
                        }}> Register</a>
                    </h5>
                </Card>
            </div>
        </Layout>
        
    )
}

export default Login;