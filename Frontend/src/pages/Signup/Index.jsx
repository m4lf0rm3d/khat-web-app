    import React, { useEffect, useState } from "react";
    import "./Signup.css"
    import LongButton from "../../components/LongButton";
    import { useNavigate } from "react-router-dom";
    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css'

    export const Signup= () =>  {
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [confirmPassword, setConfirmPassword] = useState("")
        const [createBtnDisabled, setCreateButtonDisabled] = useState(true)
        const navigate = useNavigate(); // Initialize useHistory

        const onCreateButtonClick = () => {
            // Api call            
            console.log(email, password, confirmPassword)
            let success = true;
            
            if(success){
                // Account successfully created popup
                toast.success("Account successfully created!");                
                // Navigate to Home page
                setTimeout(() => {                    
                    navigate("/home");
                }, 500); // Wait for 2 seconds
            } else {
                // Error popup
                toast.error("Something went wrong.");                
            }
        }

        useEffect(() => {
            if(email.length < 6 
                || !email.includes("@")
                || !email.includes(".com")
                || !/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password) // Check if password contains both alphabets and numbers
                || password.length < 6
                || password != confirmPassword){
                setCreateButtonDisabled(true);
            }
            else{ setCreateButtonDisabled(false) }
        }, [email, password, confirmPassword]);

        return (
            <>            
            <div className="main">
                <ToastContainer />

                <div className="upper">
                    <div className="headerSection">
                        <div className="header">Create Account</div>
                        <div className="codePrompt"> Enter your email and phone number, and we'll send you a code to create your account.</div>
                    </div>
                    <div className="getPhoneNumber">
                        <div className="inputHeader">Email</div>
                        <input className="simpleInput" type="text" placeholder="abc@gmail.com" onInput={(event) => {
                            setEmail(event.target.value);
                        }}/>                        
                    </div>
                    <div className="getPhoneNumber">
                        <div className="inputHeader">Password</div>
                        <input className="simpleInput" type="password" onInput={(event) => {
                            setPassword(event.target.value);
                        }}/>
                        <div className="warningText">Password must contain atleast 6 alphanumeric characters.</div>
                    </div>
                    <div className="getPhoneNumber">
                        <div className="inputHeader">Confirm Password</div>
                        <input className="simpleInput" type="password" onInput={(event) => {
                            setConfirmPassword(event.target.value);
                        }}/>
                        <div className="warningText" disabled={true}>Passwords must match.</div>
                    </div>
                    
                    <div className="buttonSpace" />
                    <LongButton text="Create" disabled={createBtnDisabled} onBtnClick={onCreateButtonClick}/>                    
                </div>
                

                <div className="footer">
                    <div className="footerText">
                        Already have an account?
                    </div>
                    <a href="/login">Log in</a>
                </div>     
            </div>
            </>
        );

    }