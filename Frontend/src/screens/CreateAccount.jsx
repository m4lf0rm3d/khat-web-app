import React from "react";
import "./CreateAccount.css"

const CreateAccount = () => {
    const phoneCodes = [
        '+92',
        '+91'
    ]

    return (
        <>
        <div className="main">
            <div className="header">Create Account</div>
            <p>Enter your email and phone number, and we'll send you a code to create your account.</p>
            <div className="inputHeader">Phone Number</div>
            <select name="phone-codes" id="phone-codes">
                {phoneCodes.map(
                    (phoneCode) => <option value={phoneCode}>{phoneCode}</option> 
                )}
            </select>
            <input type="text" />
            <div className="inputHeader">Email</div>
            <input type="text" />
            <div className="verifyBtn">
                <button>Verify</button>
            </div>            
        </div>
        </>
    );

}
export default CreateAccount;
