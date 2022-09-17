import React from "react";
import Header from "../Header/Header";

/**
 * Create interface for better structure
 */
interface ILayoutProps {
    title?: string,
    children?: JSX.Element
}

/**
 * 
 * @param props conditional properties for layout
 * @returns a container with specific header
 */
const Layout: React.FC<ILayoutProps> = (props) => {
    return(
        <div>
            <Header ></Header>
            {props.children}
        </div>
    )
}

export  default Layout