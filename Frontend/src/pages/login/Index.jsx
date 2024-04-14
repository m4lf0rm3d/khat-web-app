import { useEffect, useState } from "react";
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck.jsx";
import { Link, useNavigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "../../data/NavigationRoutes.jsx";
import "../create-account/CreateAccount.css";
import { Loader } from "../../components/Loader.jsx";
import Config from "../../config/appsettings.json";
import { MessagePopup } from "../../components/MessagePopup.jsx";
import { Helmet } from "react-helmet";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [responseError, setResponseErro] = useState("");

    const [loginAccount, setLoginAccount] = useState(false);
    const [loginAccountSuccess, setLoginAccountSuccess] = useState(false);

    const navigator = useNavigate();

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

        if (!validateEmail()) isValid = false;

        if (!validatePassword()) isValid = false;

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoginAccount(true);

            await fetch(Config.ApiUrl + "/Auth/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                .then(async (response) => {
                    const json = await response.json();
                    if (response.status === 200) {
                        setLoginAccount(false);
                        setResponseErro("");
                        setLoginAccountSuccess(true);

                        setTimeout(() => {
                            localStorage.setItem("token", json.token);
                            setLoginAccountSuccess(false);
                            navigator(NAVIGATION_ROUTES.DASHBOARD.path);
                        }, 2000);
                    } else {
                        setLoginAccount(false);
                        setResponseErro(json.message);
                    }
                })
                .catch((error) => {
                    setLoginAccount(false);
                    setResponseErro(error.message);
                });
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigator(NAVIGATION_ROUTES.DASHBOARD.path);
        }

    }, []);

    return (
        <section className="createAccount">
            <Helmet>
                <title>{NAVIGATION_ROUTES.LOGIN.title}</title>
            </Helmet>

            <div className="createAccountMain">
                <h1>Welcome Back!</h1>
                <form onSubmit={handleSubmit}>
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

                    <button type="submit">Login</button>

                    {responseError && (
                        <span className="responseError">{responseError}</span>
                    )}
                </form>

                <div className="createAccountFooter">
                    <p>
                        Don't have an account?{" "}
                        <Link to={NAVIGATION_ROUTES.CREATE_ACCOUNT.path}>
                            Signup
                        </Link>
                    </p>
                </div>
                {loginAccount && <Loader message="Logging in ..." />}
                {loginAccountSuccess && (
                    <MessagePopup
                        message={"Redirecting ..."}
                        messageHeader={"Success!"}
                        icon={"fa-duotone fa-check-circle loginSuccessIcon"}
                    />
                )}
            </div>
        </section>
    );
};

export default withDeviceWidthCheck(Login);
// export default Login;
