import React, { useEffect, useState } from "react";
import "./Login.css"
import LongButton from "../../components/LongButton";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export const Login= () => 
{

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [createBtnDisabled, setCreateButtonDisabled] = useState(true)
    const navigate = useNavigate();

    const onLoginButtonClick = () => {
        //Api call
        console.log(email, password)
        let success = true;

        if(success){
            // Account successfully created popup
            toast.success("Login Sucessful!");                
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
            || password.length < 6
            ){
            setCreateButtonDisabled(true);
        }
        else{ setCreateButtonDisabled(false) }
    }, [email, password]);

    return(
        <div className="main">
            <ToastContainer />

            <div className = "upper">
                <div className="headerSection">
                    <div className="header">Welcome Back!</div>
                </div>
            
                <div className="getEmailAddress">
                    <div className="inputHeader">Email Address</div>
                    <input className="simpleInput" type="text" placeholder="enter your email" onInput={(event) => {
                        setEmail(event.target.value);
                    }}/>
                    <div className="warningText">Eg. abc@gmail.com</div>
                </div>

                <div className="getPassword">
                    <div className="inputHeader">Password</div>
                    <input className="simpleInput" type="password" placeholder="enter your password" onInput={(event) => {
                        setPassword(event.target.value);
                    }}/>
                    <div className="warningText">Password must contain atleast 6 alphanumeric characters.</div>
                </div>

                <div className="buttonSpace" />
                <LongButton text="Login" disabled={createBtnDisabled} onBtnClick={onLoginButtonClick}/>

            </div>

            <div className="footer">
                <div className="footerText">
                    Don't have an accout?
                </div>
                <a href="/signup">Signup</a>
            </div>

        </div>
    );

    // return(
    //     <>
    //     <div className="main">
    //             <ToastContainer />

    //             <div className = "upper">
    //                 <div className="headerSection">
    //                     <div className="header">Welcome Back!</div>
    //                 </div>

    //                 <div className="getEmailAddress">
    //                     <div className="inputHeader">Email Address</div>
    //                     <input className="simpleInput" type="text" placeholder="enter your email" onInput={(event) => {
    //                         setEmail(event.target.value);
    //                     }}/>
    //                     <div className="warningText">Eg. abc@gmail.com</div>
    //                 </div>

    //                 <div className="getPassword">
    //                     <div className="inputHeader">Password</div>
    //                     <input className="simpleInput" type="password" placeholder="enter your password" onInput={(event) => {
    //                         setPassword(event.target.value);
    //                     }}/>
    //                     <div className="warningText">Password must contain atleast 6 alphanumeric characters.</div>
    //                 </div>

    //                 <div className="buttonSpace" />
    //                 <LongButton text="Login" disabled={createBtnDisabled} onBtnClick={onLoginButtonClick}/> 
    //             </div> 

    //             <div className="footer">
    //                 <div className="footerText">
    //                     Don't have an account?
    //                 </div>
    //                 <a href="/Signup">Sign up</a>
    //             </div>

    //     </div>
    //     </>
    // );
}