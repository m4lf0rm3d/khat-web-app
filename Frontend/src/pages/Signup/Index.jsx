    import React from "react";
    import "./Signup.css"
    import LongButton from "../../components/LongButton";

    export const Signup= () =>  {
        const phoneCodes = [
            '+92',
            '+91',
            '+90'
        ]

        return (
            <>
            <div className="main">
                <div className="upper">
                    <div className="header">Create Account</div>
                    <div className="codePrompt"> Enter your email and phone number, and we'll send you a code to create your account.</div>
                    <div className="getPhoneNumber">
                        <div className="inputHeader">Phone Number</div>
                        <div className="inputSection">
                            <select className="dropDown" name="phone-codes" id="phone-codes">
                                {phoneCodes.map(
                                    (phoneCode, index) => <option key={index} value={phoneCode}>{phoneCode}</option> 
                                )}
                            </select>
                            <input className="simpleInput" type="text" />
                        </div>
                    </div>
                    <div className="getPhoneNumber">
                        <div className="inputHeader">Email</div>
                        <input className="simpleInput" type="text" placeholder="a@b.com" />
                    </div>
                    
                    <div className="verifyBtn">
                        <LongButton text="Verify" active={false}/>
                    </div>
                </div>
                <div className="footer">
                    <div className="footerText">
                        Already have an account?
                    </div>
                    <a href="">Log in</a>
                </div>     
            </div>
            </>
        );

    }