import React from "react";
import Header from "../Header/Header";

interface ILayoutProps {
    title?: string,
    children?: JSX.Element
}


const Layout: React.FC<ILayoutProps> = (props) => {
    return(
        <div>
            <Header logout={function (e: any): void {
                throw new Error("Function not implemented.");
            } }></Header>
            {props.children}
        </div>
    )
}

export  default Layout