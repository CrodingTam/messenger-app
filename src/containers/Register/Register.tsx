import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import { auth, db } from "../../firebase/firebase";
import { addEmail, addFirstName, addLastName, addPassword } from "../../store/registerSlice";
import { RootState } from "../../store/store";
import { userLogin } from "../../store/userAuthSlice";
import { login } from "../../store/userSlice";
import Card from "../Card/Card";
import "./styleRegister.css";

/**
 * 
 * @returns a specific register layout
 */
const Register = () => {
    //use dispatch, selectors
    const reduxDispatch = useDispatch();
    const userEmail = useSelector((state:RootState) => state.register.email);
    const userPassword = useSelector((state:RootState) => state.register.password);
    const userFirstName = useSelector((state:RootState) => state.register.firstName);
    const userLastName = useSelector((state:RootState) => state.register.lastName);
    
    /**
     * Creates a new user account associated with the specified email address and password.
     * On successful creation of the user account, this user will also be signed in to our application.
     * User account creation can fail if the account already exists or the password is invalid.
     */
    const register = () => {
        if (!userFirstName || !userLastName) {
            return alert("Please enter your full name");
        }
        createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userAuth) => {
            updateProfile(userAuth.user, {
                displayName: `${userFirstName} ${userLastName}`,
                photoURL: `${userFirstName}.jpg`,
            }).then(() => {
                reduxDispatch(login({
                    email: userAuth.user.email,
                    displayName: userAuth.user.displayName
                }));
                setDoc(doc(db, "users", userAuth.user.uid), {
                    displayName: userAuth.user.displayName,
                    uid: userAuth.user.uid,
                    createdAt: new Date(),
                    photoURL: userAuth.user.photoURL,
                    isOnline: true
                }).then(()=> {
                    window.location.pathname = "/";
                })
            }).catch((err) => {
                alert(err);
            })
            alert("You are registered and logged in succesfully...");
           
        })
        .catch((err) => {
            reduxDispatch(userLogin({type:"USER_LOGIN_FAILURE", error:{err}}));
            alert(err);
        });
    }

    return(
        <Layout>
            <div className="registerContainer">
                <div className="brand-logo-register"></div>
                <div className="brand-title">Sign up</div>
                <Card>
                    <form>
                        <input 
                            name="firstName"
                            type="text" 
                            value={userFirstName}
                            onChange={(e) => reduxDispatch(addFirstName(e.target.value))}
                            required
                            placeholder="Your first name here "
                        />
                        <br></br>
                        <input 
                            name="lastName"
                            type="text" 
                            value={userLastName}
                            onChange={(e) => reduxDispatch(addLastName(e.target.value))}
                            required
                            placeholder="Your last name here"
                        />
                        <br></br>
                        <input 
                            name="email"
                            type="text" 
                            value={userEmail}
                            onChange={(e) => reduxDispatch(addEmail(e.target.value))}
                            required
                            placeholder="Email here"
                        />
                        <br></br>
                        <input 
                            name="password"
                            type="password" 
                            value={userPassword}
                            onChange={(e) => reduxDispatch(addPassword(e.target.value))}
                            required
                            placeholder="Password here"
                        />
                        <br></br>
                    <div className="registerIconContainer">
                        <i className='bx bx-plus-circle' onClick={register} id="registerIcon"></i>
                    </div>
                    </form>
                </Card>
            </div>
           
        </Layout>
        
    )
}

export default Register;