import { useEffect, useState } from "react";
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck.jsx";
import { NAVIGATION_ROUTES } from "../../data/NavigationRoutes.jsx";
import "../create-account/CreateAccount.css";
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { MailOutline, HomeOutline, PersonAddOutline } from 'react-ionicons';

const AddCompanion = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //Send Invite Link here
        //Create Record in Database
        //API Call here
    }

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

    const onGoBackClick = () => {
        // Navigate to the "KHATS" screen
        navigate(NAVIGATION_ROUTES.HOMEPAGE.path);
    };

    useEffect(() => {
        const ulElement = document.querySelector('.navigation ul');
        const activeLink = (e) => {
            const target = e.target.closest('li');
            if (!target) return;
            const listItems = ulElement.querySelectorAll('li');
            listItems.forEach((item) => item.classList.remove('active'));
            target.classList.add('active');
        };
        ulElement.addEventListener('click', activeLink);
        return () => {
            ulElement.removeEventListener('click', activeLink);
        };
    }, []);

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
                            value={email}
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
                <div className="navigation">
                    <ul>
                        <li className="list active">
                            <a href="#">
                                <span className="icon">
                                    <HomeOutline />
                                </span>
                                <span className="text">Home</span>
                            </a>
                        </li>
                        <li className="list">
                            <a href="#">
                                <span className="icon">
                                    <MailOutline />
                                </span>
                                <span className="text">Khats</span>
                            </a>
                        </li>
                        <li className="list">
                            <a href="#">
                                <span className="icon">
                                    <PersonAddOutline />
                                </span>
                                <span className="text">Add Companion</span>
                            </a>
                        </li>
                        <div className="indicator"></div>
                    </ul>
                </div>
                <button className="button2" onClick={onGoBackClick}>Back To Home</button>
            </div>
        </section>
    );
};

export default withDeviceWidthCheck(AddCompanion);

