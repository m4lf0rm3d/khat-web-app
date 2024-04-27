import { useEffect, useState } from "react";
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck.jsx";
import { Link, useNavigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "../../data/NavigationRoutes.jsx";
import "./CreateAccount.css";
import { Loader } from "../../components/Loader.jsx";
import { Helmet } from "react-helmet";
import { MessagePopup } from "../../components/MessagePopup.jsx";
import { fetchAppSettings } from "../../utils/FetchAppSettings.js";

const CreateAccount = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [genderId, setGenderId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [genderIdError, setGenderIdError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [responseError, setResponseErro] = useState("");

    const [creatingAccount, setCreatingAccount] = useState(false);
    const [creatingAccountSuccess, setCreatingAccountSuccess] = useState(false);

    const [config, setConfig] = useState({});

    const navigator = useNavigate();

    useEffect(() => {
        async function fetchConfig() {
            const config = await fetchAppSettings();
            setConfig(config);
        }
        fetchConfig();
    }, []);

    const validateNamePart = (namePart, namePartErrorSetter, firstOrLast) => {
        if (!namePart) return namePartErrorSetter("First name is required");
        if (namePart.length < 1)
            return namePartErrorSetter(
                firstOrLast + "must be at least 1 characters long"
            );
        if (namePart.length > 25)
            return namePartErrorSetter(
                firstOrLast + "must be at most 25 characters long"
            );
        namePartErrorSetter(
            firstOrLast + "must contain only alphabets and spaces"
        );
        if (!/^[a-zA-Z ]+$/.test(namePart))
            return namePartErrorSetter(
                firstOrLast + "must contain only alphabets and spaces"
            );

        namePartErrorSetter("");
        return true;
    };

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

    const validatePassword = () => {
        if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!""#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!""#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,64}$/.test(
                password
            )
        )
            return setPasswordError(
                "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
            );

        setPasswordError("");
        return true;
    };

    const validateForm = () => {
        let isValid = true;

        if (!validateNamePart(firstName, setFirstNameError, "First name "))
            isValid = false;
        if (!validateNamePart(lastName, setLastNameError, "Last name "))
            isValid = false;

        if (!validateEmail()) isValid = false;

        if (!validatePassword()) isValid = false;

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setCreatingAccount(true);

            await fetch(config.ApiUrl + "/Auth/Signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    genderId: genderId,
                    email: email,
                    password: password,
                }),
            })
                .then(async (response) => {
                    const json = await response.json();
                    if (response.status === 200) {
                        setCreatingAccountSuccess(true);
                        setCreatingAccount(false);
                        setResponseErro("");
                        setTimeout(() => {
                            localStorage.setItem("token", json.token);
                            setCreatingAccountSuccess(false);
                            navigator(NAVIGATION_ROUTES.HOME.path);
                        }, 2000);
                    } else {
                        setCreatingAccount(false);
                        setResponseErro(json.message);
                    }
                })
                .catch((error) => {
                    setCreatingAccount(false);
                    setResponseErro("Account creation failed!");
                });
        }
    };

    return (
        <section className="createAccount">
            <Helmet>
                <title>{NAVIGATION_ROUTES.CREATE_ACCOUNT.title}</title>
            </Helmet>

            <div className="createAccountMain">
                <h1>Create Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="inputBoxCreateAccount">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Enter your first name"
                            required
                            onChange={(e) => {
                                setFirstName(e.target.value);
                                setFirstNameError("");
                            }}
                            onBlur={(e) => {
                                validateNamePart(
                                    firstName,
                                    setFirstNameError,
                                    "First name "
                                );
                            }}
                        />
                        {firstNameError && <span>{firstNameError}</span>}
                    </div>

                    <div className="inputBoxCreateAccount">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Enter your last name"
                            required
                            onChange={(e) => {
                                setLastName(e.target.value);
                                setLastNameError("");
                            }}
                            onBlur={(e) => {
                                validateNamePart(
                                    lastName,
                                    setLastNameError,
                                    "Last name "
                                );
                            }}
                        />
                        <span>{lastNameError}</span>
                    </div>

                    <div className="inputBoxCreateAccount">
                        <label htmlFor="gender">Gender</label>
                        <select
                            name="gender"
                            id="gender"
                            onChange={(e) => {
                                setGenderId(e.target.value);
                                setGenderIdError("");
                            }}
                            required
                        >
                            <option value="" disabled selected>
                                Select a gender
                            </option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                            <option value="3">Other</option>
                        </select>
                        <span>{genderIdError}</span>
                    </div>

                    <div className="inputBoxCreateAccount">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
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

                    <div className="inputBoxCreateAccount">
                        <label htmlFor="password">Password</label>
                        <div className="passwordBoxCreateAccount">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                required
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError("");
                                }}
                                onBlur={(e) => {
                                    validatePassword();
                                }}
                            />
                            {showPassword ? (
                                <i
                                    className="fa-duotone fa-eye-slash"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                ></i>
                            ) : (
                                <i
                                    className="fa-duotone fa-eye"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                ></i>
                            )}
                        </div>
                        <span>{passwordError}</span>
                    </div>

                    <button type="submit">Create Account</button>

                    {responseError && (
                        <span className="responseError">{responseError}</span>
                    )}
                </form>

                <div className="createAccountFooter">
                    <p>
                        Already have an account?{" "}
                        <Link to={NAVIGATION_ROUTES.LOGIN.path}>Login</Link>
                    </p>
                </div>
                {creatingAccount && <Loader message="Creating Account ..." />}
                {creatingAccountSuccess && (
                    <MessagePopup
                        message="You're now a member of Khat!"
                        icon="fa-duotone fa-party-horn createAccountSuccessIcon"
                        messageHeader="Congrats!"
                    />
                )}
            </div>
        </section>
    );
};

export default withDeviceWidthCheck(CreateAccount);
