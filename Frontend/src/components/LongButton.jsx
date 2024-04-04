import React from "react";
import "./LongButton.css"

const LongButton = ({text, disabled, onBtnClick}) => {
    return (
        <button 
        className="btn" 
        disabled={disabled} 
        onClick={onBtnClick}
        style={{backgroundColor: disabled? "#E1C9B0" : "#5B3A1D"}}>
            {text}
        </button>
    );
}

export default LongButton;