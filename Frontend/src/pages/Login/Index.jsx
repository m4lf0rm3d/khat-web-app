import React from "react";
import "./Login.css"

export const Login= () => {

    return(
        <>
            <div className="main">
                <div className="header">Welcome Back!</div>

                <div className="inputHeader">Email Address</div>
                <input className="simpleInput" type="text" />
                <div className="subcodePrompt"> Eg. abc@gmail.com</div>

                <div className="inputHeader">Password</div>
                <input className="simpleInput" type="text" />
                <div className="subcodePrompt">Password must be atleast 16 characters long.</div>

                <div className="LoginBtn">
                <button>Login</button>
                </div> 

                <div className="codePrompt">Don't have an account?</div> 
                <div className="SignUpBtn">
                <button>Sign Up</button>
                </div> 
            </div>
        </>
    )
}