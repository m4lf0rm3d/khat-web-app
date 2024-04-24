import { useEffect, useState } from "react";
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck.jsx";
import { NAVIGATION_ROUTES } from "../../data/NavigationRoutes.jsx";
import "../create-account/CreateAccount.css";
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { MailOutline, HomeOutline, PersonAddOutline } from 'react-ionicons';

const AddCompanion = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(1); // Set initial active index to 1 for "Add Companion"

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


    const handleItemClick = (route, index) => {
    // Add animation to move the indicator
    const indicator = document.querySelector('.indicator');
    const listItems = document.querySelectorAll('.list');
    const currentItem = listItems[activeIndex];
    const targetItem = listItems[index];
    const indicatorPosition = targetItem.offsetLeft - currentItem.offsetLeft;
    indicator.style.transition = 'transform 0.5s ease-in-out';
    indicator.style.transform = `translateX(${indicatorPosition}px)`;

    // Delay navigation after animation
    setTimeout(() => {
        navigate(route);
        setActiveIndex(index);
    }, 150); // 0.3s delay to match the animation duration
    };

    useEffect(() => {
        // Map the routes to their corresponding paths
        const routes = [
            NAVIGATION_ROUTES.HOMEPAGE.path,
            NAVIGATION_ROUTES.ADD_COMPANION.path,
            NAVIGATION_ROUTES.KHATS.path
        ];
        // Find the index of the current location
        const index = routes.indexOf(location.pathname);
        setActiveIndex(index);
    }, [location.pathname]);

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
                            placeholder="Enter your Companion's email address"
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
                        <li className={`list ${activeIndex === 0 ? 'active' : ''}`} onClick={() => handleItemClick(NAVIGATION_ROUTES.HOMEPAGE.path, 0)}>
                            <a href="#">
                                <span className="icon">
                                    <HomeOutline />
                                </span>
                                <span className="text">Home</span>
                            </a>
                        </li>
                        <li className={`list ${activeIndex === 1 ? 'active' : ''}`} onClick={() => handleItemClick(NAVIGATION_ROUTES.ADD_COMPANION.path, 1)}>
                            <a href="#">
                                <span className="icon">
                                    <PersonAddOutline />
                                </span>
                                <span className="text">Add Companion</span>
                            </a>
                        </li>
                        <li className={`list ${activeIndex === 2 ? 'active' : ''}`} onClick={() => handleItemClick(NAVIGATION_ROUTES.KHATS.path, 2)}>
                            <a href="#">
                                <span className="icon">
                                    <MailOutline />
                                </span>
                                <span className="text">Khats</span>
                            </a>
                        </li>
                        <div className="indicator"></div>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default withDeviceWidthCheck(AddCompanion);
