import { Helmet } from "react-helmet";
import DeviceNotSupportedImage from "../../assets/DeviceNotSupported.webp"
import "./DeviceNotSupported.css";
import { NAVIGATION_ROUTES } from "../../data/NavigationRoutes";

export const DeviceNotSupported = () => {

    return (
        <section className="deviceNotSupported">
            <Helmet>
                <title>{NAVIGATION_ROUTES.DEVICE_NOT_SUPPORTED.title}</title>
            </Helmet>

            <div className="deviceNotSupportedMain">
                <img src={DeviceNotSupportedImage} alt="Mobile Devices Only" />
                <h1>Sorry, this page is only available for mobile devices.</h1>
            </div>
        </section>
    );

}