import { Helmet } from "react-helmet";
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck";
import PageNotFoundImage from "../../assets/404.svg"
import "./PageNotFound.css";
import { NAVIGATION_ROUTES } from "../../data/NavigationRoutes";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {

    const navigator = useNavigate();

    return (
        <section className="pageNotFound">
            <Helmet>
                <title>404 - Page Not Found</title>
            </Helmet>

            <div className="pageNotFoundMain">
                <img src={PageNotFoundImage} alt="404 Page Not Found" />
                <h1>
                    404 - Page Not Found
                </h1>
                <p>The page you are looking for does not exist.</p>
                <button
                    onClick={(e) => {
                        navigator(NAVIGATION_ROUTES.DASHBOARD.path);
                    }}
                ><i className="fa fa-solid arrow-left" ></i> Go to Home</button>
            </div>
        </section>
    );
};

export default withDeviceWidthCheck(PageNotFound);
