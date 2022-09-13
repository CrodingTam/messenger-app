import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import { auth } from "../../firebase/firebase";
import { addEmail, addFirstName, addLastName, addPassword } from "../../store/registerSlice";
import { RootState } from "../../store/store";
import { login } from "../../store/userSlice";
import Card from "../Card/Card";
import "./styleRegister.css";

const Register = () => {
    const reduxDispatch = useDispatch();
    const userEmail = useSelector((state:RootState) => state.register.email);
    const userPassword = useSelector((state:RootState) => state.register.password);
    const userFirstName = useSelector((state:RootState) => state.register.firstName);
    const userLastName = useSelector((state:RootState) => state.register.lastName);

    const register = () => {
        if (!userFirstName || !userLastName) {
            return alert("Please enter your full name");
        }

        createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userAuth) => {
            updateProfile(userAuth.user, {
                displayName: userFirstName
            })
            .catch((error) => {
                console.log("User not updated");
            });
            reduxDispatch(login({
                email: userAuth.user.email,
                displayName: userFirstName
            }))
            alert("You are registered succesfully");
            window.location.pathname = "/";
        })
        .catch((err) => {
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