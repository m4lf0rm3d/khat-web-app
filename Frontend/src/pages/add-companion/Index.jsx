import { useEffect, useState } from "react";
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck.jsx";
import { NAVIGATION_ROUTES } from "../../data/NavigationRoutes.jsx";
import "../create-account/CreateAccount.css";
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { MailOutline, HomeOutline, PersonAddOutline } from 'react-ionicons';
//import { mailOutline, personAddOutline } from 'ionicons/icons';

const AddCompanion = () =>{

    const handleSubmit = async (e) => {
        //Send Invite Link here
        //Create Record in Database
        //API Call here

    }

    const [emailError, setEmailError] = useState("");

    const validateEmail = () => {
        if (!email) return setEmailError("Email is required");
        if (email.length < 4 || email.length > 100)
            return setEmailError("Invalid email length");
        if (
            !/^(?:(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*)|(?:""(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*""))@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])$/.test(
                email
            )
        )
            return setEmailError("Invalid Email");

        setEmailError("");
        return true;
    };
    const navigate = useNavigate();

    // Event handler for the "View Companions" button
    const onGoBackClick = () => {
      // Navigate to the "KHATS" screen
      navigate(NAVIGATION_ROUTES.HOMEPAGE.path);
    };


    return (
        <section className="createAccount">
            <Helmet>
                <title>{NAVIGATION_ROUTES.ADD_COMPANION.title}</title>
            </Helmet>

            <div className="createAccountMain">
                <h1>Add A Companion!</h1>
                <form onSubmit={handleSubmit}>
                    <div className="inputBoxCreateAccount">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your Companions email address"
                            required
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError("");
                            }}
                            onBlur={(e) => {
                                validateEmail();
                            }}
                        />
                        <span>{emailError}</span>
                    </div>

                    <button type="submit">Add Companion</button>
                    
                </form>
                <div class = "navigation">
                    <ul>
                        <li class = "list active">
                            <a href = "#">
                                <span class = "icon">
                                    <HomeOutline/>
                                </span>
                                <span class = "text">Home</span>
                            </a>
                        </li>
                        <li class = "list">
                            <a href = "#">
                                <span class = "icon">
                                    <MailOutline/>
                                </span>
                                <span class = "text">Khats</span>
                            </a>
                        </li>
                        <li class = "list">
                            <a href = "#">
                                <span class = "icon">
                                    <PersonAddOutline/>
                                </span>
                                <span class = "text">Add Companion</span>
                            </a>
                        </li>
                        <div class="indicator"></div>
                    </ul>
                </div>
                <button className="button2" onClick={onGoBackClick}>Back To Home</button>
            </div>
        </section>
    )
}

export default withDeviceWidthCheck(AddCompanion);