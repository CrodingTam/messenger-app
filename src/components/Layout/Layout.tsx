import React from "react";
import Header from "../Header/Header";

interface ILayoutProps {
    title?: string,
    children?: JSX.Element
}


const Layout: React.FC<ILayoutProps> = (props) => {
    return(
        <div>
            <Header ></Header>
            {props.children}
        </div>
    )
}

export  default Layout