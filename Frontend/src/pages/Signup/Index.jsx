import React from "react";
import "./Signup.css"

export const Signup= () =>  {
    const phoneCodes = [
        '+92',
        '+91',
        '+90'
    ]

    return (
        <>
        <div className="main">
            <div className="header">Create Account</div>
            <div className="codePrompt"> Enter your email and phone number, and we'll send you a code to create your account.</div>
            <div className="getPhoneNumber">
                <div className="inputHeader">Phone Number</div>
                <select name="phone-codes" id="phone-codes">
                    {phoneCodes.map(
                        (phoneCode) => <option value={phoneCode}>{phoneCode}</option> 
                    )}
                </select>
                <input className="simpleInput" type="text" />
            </div>
            <div className="inputHeader">Email</div>
            <input className="simpleInput" type="text" />
            <div className="verifyBtn">
                <button>Verify</button>
            </div>            
        </div>
        </>
    );

}