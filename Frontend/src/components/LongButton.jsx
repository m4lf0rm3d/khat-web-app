import React from "react";
import "./LongButton.css"

const LongButton = ({text, active}) => {
    return (
        <button className="btn" style={{backgroundColor: active? "white" : "#E1C9B0"}}>
            {text}
        </button>
    );
}

export default LongButton;