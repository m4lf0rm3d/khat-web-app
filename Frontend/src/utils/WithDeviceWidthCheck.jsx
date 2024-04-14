import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { RedirectWrapper } from "../components/RedirectWrapper";
import { NAVIGATION_ROUTES } from "../data/NavigationRoutes";

export const withDeviceWidthCheck = (WrappedComponent) => {
    return () => {
        const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
        const location = useLocation();

        useEffect(() => {
            const handleResize = () => {
                setDeviceWidth(window.innerWidth);
            };

            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }, []);


        return deviceWidth <= 600 ? (
            <WrappedComponent deviceWidth={deviceWidth} location={location} />
        ) : (
            <RedirectWrapper url={NAVIGATION_ROUTES.DEVICE_NOT_SUPPORTED.path} />
        );
    };
};