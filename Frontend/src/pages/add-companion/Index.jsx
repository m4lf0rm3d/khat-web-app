import { useEffect, useState } from "react";
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck.jsx";
import { NAVIGATION_ROUTES } from "../../data/NavigationRoutes.jsx";
import "../create-account/CreateAccount.css";

import { Helmet } from "react-helmet";

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
            </div>
        </section>

    )
}

export default withDeviceWidthCheck(AddCompanion);