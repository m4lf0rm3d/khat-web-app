import { Helmet } from "react-helmet";
import { withDeviceWidthCheck } from "../../utils/WithDeviceWidthCheck";
import PageNotFoundImage from "../../assets/404.svg"
import "./PageNotFound.css";

const PageNotFound = () => {
    return (
        <section className="pageNotFound">
            <Helmet>
                <title>404 - Page Not Found</title>
            </Helmet>

            <div className="pageNotFoundMain">
                <img src={PageNotFoundImage} alt="404 Page Not Found" />
                <h1>
                    <b>404 - Page Not Found</b>
                </h1>
                <p>The page you are looking for does not exist.</p>
            </div>
        </section>
    );
};

export default withDeviceWidthCheck(PageNotFound);
