import React from "react";
import "./styleCard.css"

interface ICardProps {
    children?: any
}


/**Create for consistens Form style */
const Card: React.FC<ICardProps> = (props) => {
    return(
        <div className="card">
            {props.children}
        </div>
    )
}

export default Card;