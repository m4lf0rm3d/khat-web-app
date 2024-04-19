import Login from "../pages/login/Index";
import Signup from "../pages/create-account/Index";
import AddCompanion from "../pages/add-companion/Index";
import Dashboard from "../pages/dashboard/Index";
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
    ADD_COMPANION: {
        path: "/add-companion",
        component: AddCompanion,
        title: "Khat | Add Companion",
    },
    DEVICE_NOT_SUPPORTED: {
        path: "/device-not-supported",
        component: DeviceNotSupported,
        title: "Khat | Device Not Supported",
    },
    DASHBOARD: {
        path: "/dashboard",
        component: Dashboard,
        title: "Khat | Dashboard",
    },
    SEND_KHAT: {
        path: "/send-khat",
        component: Send_Khat,
        title: "Khat | Send Khat",
    },
};
