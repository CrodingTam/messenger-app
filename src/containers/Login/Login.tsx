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

        console.log(e);
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
        })
        // display the error if any
        .catch((err) => {
            alert(err);
        })
    }

    const signOutFromApp = () => {
        reduxDispatch(logout());
        signOut(auth).then(() => {
            alert("Signed out succesfully");
        }).catch((error) => {
            alert(error);
        })
    }


    return(
        <Layout>
            <div className="loginContainer">
                <Card>
                    <form>
                        <input 
                        name="email"
                        type="text" 
                        value={userEmail}
                        onChange={(e) => reduxDispatch(setEmail(e.target.value))}
                        placeholder="Email here"
                        />
                        <input 
                        name="password"
                        type="password" 
                        value={userPassword}
                        onChange={(e) => reduxDispatch(setPassword(e.target.value))}
                        placeholder="Password here"
                        />
                        <input type="button" value="Log in" onClick={loginToApp}/>
                    </form>
                    <p> 
                        If you don't have an account, you can create here easily: 
                        <a href="/register" onClick={() => {
                            signOutFromApp();
                        }}>Sign up</a>
                    </p>
                </Card>
            </div>
        </Layout>
        
    )
}

export default Login;