import { createBrowserRouter } from "react-router-dom";
import { NAVIGATION_ROUTES } from "../data/NavigationRoutes.jsx";


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
        element: <h1>404</h1>,
        title: "404",
    },
]);
