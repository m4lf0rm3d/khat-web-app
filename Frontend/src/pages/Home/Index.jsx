import React from "react";
import "./Home.css";
import LongButton from "../../components/LongButton";

export const Home = () => {
    return(
        <div className="main">
            <div className="homeHeader">Khat</div>
            <div className="prompt">
                Send a message to (NAME).
            </div>
            <input className="textBox" type="text" />
            <LongButton text={"Add to Khat"} disabled={false}/>
            <LongButton text={"View Khat"} disabled={false}/>

        </div>
    );
};