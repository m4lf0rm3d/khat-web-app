import { createBrowserRouter } from "react-router-dom";
import { NAVIGATION_ROUTES } from "../data/NavigationRoutes.jsx";
import PageNotFound from "../pages/404/Index.jsx";

export const router = createBrowserRouter([
    ...Object.keys(NAVIGATION_ROUTES).map((key) => {
        const route = NAVIGATION_ROUTES[key];
        return {
            path: route.path,
            element: <route.component />,
            title: route.title,
        };
    }),
    {
        path: "*",
        element: <PageNotFound />,
        title: "404",
    },
]);
