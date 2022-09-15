import { signOut, User } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { RootState } from "../../store/store";
import { userLogout } from "../../store/userAuthSlice";
import { logout, selectUser } from "../../store/userSlice";
import "./styleHeader.css";

interface IHeaderProps {
    logout?: (e: any) => void;
}

const Header: React.FC<IHeaderProps> = (props) => {
    const reduxDispatch = useDispatch();
    const user = useSelector(selectUser);
    const displayName = useSelector((state:RootState) => state.user.displayName);
    const profileURL = useSelector((state:RootState) => state.user.photoURL);
    const signOutFromApp = () => {
        reduxDispatch(logout());
        reduxDispatch(userLogout({type:"USER_LOGOUT_REQUEST"}));
        signOut(auth).then(() => {
            alert("Signed out succesfully");
            localStorage.clear();
            reduxDispatch(userLogout({type:"USER_LOGOUT_SUCCES"}));
        }).catch((error) => {
            alert(error);
            reduxDispatch(userLogout({type:"USER_LOGOUT_FAILURE", error: {error}}));
        })
        window.location.pathname = "/login";
    }
    return(
        <header className="header">
            <div>
                <ul className="leftMenu">
                    {/* If the user is logged in we can not click  */}
                    {!user ? (
                        [
                            <li className="login"><NavLink to={"/login"}> <i className='bx bx-log-in'></i>Log in</NavLink></li>,
                            <li className="signup"><NavLink to={"/register"}><i className='bx bx-up-arrow-circle'></i>Sign up</NavLink></li>
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
                <li>
                    <Link to={"#"} onClick={() => {
                        signOutFromApp();
                    }}><i className='bx bx-log-out'></i>Log Out</Link>
                </li>
            </ul>

        </header>
    )
}

export default Header;