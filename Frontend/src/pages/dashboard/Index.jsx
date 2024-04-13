import { useNavigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "../../data/NavigationRoutes";
import { useEffect } from "react";
import { verifyAndValidateJWT } from "../../utils/AuthUtility";
import { Helmet } from "react-helmet";
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck";

const Dashboard = () => {
    const navigator = useNavigate();

    useEffect(() => {
        verifyAndValidateJWT(navigator);
    }, []);

    return (
        <section className="dashboard">
            <Helmet>
                <title>{NAVIGATION_ROUTES.DASHBOARD.title}</title>
            </Helmet>

            <h1>Dashboard</h1>
            <p>You must see token</p>
            <p style={{overflowWrap: "break-word"}} >{localStorage.getItem("token")}</p>
            <button
                onClick={(e) => {
                    localStorage.removeItem("token");
                    navigator(NAVIGATION_ROUTES.LOGIN.path);
                }}
            >
                Logout
            </button>
        </section>
    );
};

export default withDeviceWidthCheck(Dashboard);
