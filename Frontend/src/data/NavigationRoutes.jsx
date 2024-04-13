import { Login } from "../pages/login/Index";
import Signup from "../pages/create-account/Index";
import { DeviceNotSupported } from "../pages/device-not-supported/Index";

export const NAVIGATION_ROUTES = {
    LOGIN: {
        path: "/login",
        component: Login,
        title: "Khat | Login",
    },
    CREATE_ACCOUNT: {
        path: "/create-account",
        component: Signup,
        title: "Khat | Create Account",
    },
    DEVICE_NOT_SUPPORTED: {
        path: "/device-not-supported",
        component: DeviceNotSupported,
        title: "Khat | Device Not Supported",
    }
};
