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
        
        })
        .catch((err) => {
            alert(err);
        })
    }

    return(
        <Layout>
            <div className="registerContainer">
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
                        <input 
                            name="lastName"
                            type="text" 
                            value={userLastName}
                            onChange={(e) => reduxDispatch(addLastName(e.target.value))}
                            required
                            placeholder="Your last name here"
                        />
                        <input 
                            name="email"
                            type="text" 
                            value={userEmail}
                            onChange={(e) => reduxDispatch(addEmail(e.target.value))}
                            required
                            placeholder="Email here"
                        />
                        <input 
                            name="password"
                            type="password" 
                            value={userPassword}
                            onChange={(e) => reduxDispatch(addPassword(e.target.value))}
                            required
                            placeholder="Password here"
                        />

                    <input type="button" value="Sign up" onClick={register}/>
                    </form>
                </Card>
            </div>
           
        </Layout>
        
    )
}

export default Register;