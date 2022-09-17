import { async } from "@firebase/util";
import { signOut, updateProfile, User } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { RootState } from "../../store/store";
import userAuthSlice, { userLogout } from "../../store/userAuthSlice";
import { logout, selectUser } from "../../store/userSlice";
import "./styleHeader.css";

/**
 * Create interface for better structure
 */
interface IHeaderProps {
    logout?: (e: any) => void;
}

/**
 * 
 * @param props conditional properties for header component
 * @returns a specific header
 */
const Header: React.FC<IHeaderProps> = (props) => {
    /**
     * selectors, subscribes, redux dispatch
     */
    const reduxDispatch = useDispatch();
    const user = useSelector(selectUser);
    const userUid = useSelector((state:RootState) => state.userAuth.userInfo.uid);
    const displayName = useSelector((state:RootState) => state.user.displayName);
    const profileURL = useSelector((state:RootState) => state.user.photoURL);

    /**
     * Log out from app with firebase's specific function, which is signs out the current user
     * Dispatch necessary actions for log out
     * Navigate to login page
     */
    const signOutFromApp = () => {
        reduxDispatch(logout());
        reduxDispatch(userLogout({type:"USER_LOGOUT_REQUEST"}));
        signOut(auth).then( (document) => {
            alert("You are logged in succesfully");
            localStorage.clear();
            reduxDispatch(userLogout({type:"USER_LOGOUT_SUCCES"}));
        }).catch((error) => {
            alert(error);
            reduxDispatch(userLogout({type:"USER_LOGOUT_FAILURE", error: {error}}));
        })
        window.location.pathname = "/login";
    }

    /**
     * When the user is logged oout, we update his/her availability status
     */
    const setOfflineState = async () => {
        const docref = doc(db,"users",userUid)
        updateDoc(docref, {
            isOnline : false
        }).then(() => signOutFromApp())
        .catch((error) => alert(error));
    }

    return(
        <header className="header">
            <div>
                <ul className="leftMenu">
                    {/* If the user is logged in we can not click  */}
                    {!user ? (
                        [
                            <li className="login" key={"login"}><NavLink to={"/login"}> <i className='bx bx-log-in'></i>Log in</NavLink></li>,
                            <li className="signup" key={"signup"}><NavLink to={"/register"}><i className='bx bx-up-arrow-circle'></i>Sign up</NavLink></li>
                        ]
                    ): (
                        ""
                    )}
                    
                </ul> 
              
            </div>

            {!user ?  <div className="logo"><img src="../../images/messenger.png" alt="messengerImage" className="messengerImage"></img></div> 
                : 
                <div className="profileImageContainer">
                    <img src={`../../images/profileImages/${profileURL}`} alt="hehe" className="profileImage"></img>
                </div>
            }
           
            <div className="nameDisplayer">{user ? <i className='bx bx-id-card' id="displayIcon" ></i> : ""}{user ? `${displayName}`  : ""}</div>

            <ul className="menu">
                <li key={"menu"}>
                    <Link to={"#"} onClick={() => {
                        setOfflineState();
                    }}><i className='bx bx-log-out'></i>Log Out</Link>
                </li>
            </ul>

        </header>
    )
}

export default Header;