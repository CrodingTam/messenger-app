import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./styleHeader.css";

interface IHeaderProps {
    logout?: (e: any) => void;
}

const Header: React.FC<IHeaderProps> = (props) => {
    return(
        <header className="header">
            <div style={{display: "flex"}}>
                <div className="logo">Messenger app</div>
                <ul className="leftMenu">
                    <li><NavLink to={"/login"}>Login</NavLink></li>
                    <li><NavLink to={"/register"}>Register</NavLink></li>
                </ul> 
            </div>
            <div style={{margin: "20px 0", color: "#fff", fontWeight: "bold"}}>Hi Tamas</div>
            <ul className="menu">
                <li>
                    <Link to={"#"} onClick={props.logout}>Log Out</Link>
                </li>
            </ul>

        </header>
    )
}

export default Header;