import { NAVIGATION_ROUTES } from "../data/NavigationRoutes";

export const verifyAndValidateJWT = (navigator) => {
    const token = localStorage.getItem("token");
    if (!token) {
        navigator(NAVIGATION_ROUTES.LOGIN.path);
    }
    //if token is expired, remove it
    if (token && token !== "undefined") {
        const tokenExpiration = JSON.parse(atob(token.split(".")[1]));
        if (tokenExpiration.exp < Date.now() / 1000) {
            localStorage.removeItem("token");
            navigator(NAVIGATION_ROUTES.LOGIN.path);
        }
    }
};
