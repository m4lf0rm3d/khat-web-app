import Login from "../pages/login/Index";
import Signup from "../pages/create-account/Index";
import AddCompanion from "../pages/add-companion/Index";
import Dashboard from "../pages/dashboard/Index";
import { DeviceNotSupported } from "../pages/device-not-supported/Index";
import { ViewKhat } from "../pages/ViewKhat/Index";
import Khats from "../pages/Khats/Index";
import CompanionsList from "../pages/CompanionsList/Index";
import Homepage from "../pages/homepage/Index";
import ViewReceivedKhat from "../pages/ViewReceivedKhat/Index";
import { WriteKhat } from "../pages/write-khat/Index";
import Companions from "../pages/companions/Index";
import KhatsList from "../pages/khats-list/Index";

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
    HOME: {
        path: "/",
        component: WriteKhat,
        title: "Khat | Write Khat",
    },
    ADD_COMPANION: {
        path: "/add-companion",
        component: AddCompanion,
        title: "Khat | Add Companion",
    },
    VERIFY_COMPANION: {
        path: "/add-companion/verify/:verificationCode",
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
    VIEWKHAT: {
        path: "/viewkhat",
        component: ViewKhat,
        title: "Khat | View Khat",
    },
    COMPANIONSLIST: {
        path: "/companions",
        component: Companions,
        title: "Khat | Companions",
    },
    KHAT_LIST: {
        path: "/companions/:companionId/khats",
        component: KhatsList,
        title: "Khat | Khat List",
    },
    KHATS: {
        path: "/companion2s/:companionId/khats/",
        component: Khats,
        title: "Khat | Khats",
    },
    VIEWRECEIVEDKHAT: {
        path: "/companions/:companionId/khats/:khatId",
        component: ViewReceivedKhat,
        title: "Khat | ViewReceivedKhat",
    },
    HOMEPAGE: {
        path: "/homepage",
        component: Homepage,
        title: "Khat | Home",
    },
};
