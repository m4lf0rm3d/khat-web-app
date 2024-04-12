import { createBrowserRouter, Link } from "react-router-dom";
import App from "../App";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "about",
        element: <div>About</div>,
    },
]);
