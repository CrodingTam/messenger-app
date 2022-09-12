import { User } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { RootState } from "../../store/store";
import { logout, selectUser } from "../../store/userSlice";
import "./styleHeader.css";

interface IHeaderProps {
    logout?: (e: any) => void;
}

const Header: React.FC<IHeaderProps> = (props) => {
    const reduxDispatch = useDispatch();
    const user = useSelector(selectUser);
    const displayName = useSelector((state:RootState) => state.user.displayName);
    return(
        <header className="header">
            <div style={{display: "flex"}}>
                <div className="logo">Messenger app</div>
                <ul className="leftMenu">
                    {/* If the user is logged in we can not click  */}
                    {!user ? (
                        <li><NavLink to={"/login"}>Login</NavLink></li>
                    ): (
                        ""
                    )}
                    <li><NavLink to={"/register"}>Sign up</NavLink></li>
                </ul> 
            </div>
            <div style={{margin: "20px 0", color: "#fff", fontWeight: "bold"}}>{user ? `Welcome ${displayName}`  : ""}</div>
            <ul className="menu">
                <li>
                    <Link to={"#"} onClick={() => {
                        reduxDispatch(logout())
                    }}>Log Out</Link>
                </li>
            </ul>

        </header>
    )
}

export default Header;