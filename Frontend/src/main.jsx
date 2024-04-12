import ReactDOM from "react-dom/client";
import "./styles/global.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/PageRoutes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
