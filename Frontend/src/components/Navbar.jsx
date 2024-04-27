import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {

    const navigate = useNavigate();

    return (
        <div className="navLinks">
            <br />
            <hr />
            <br />

            <Link to="/">Home </Link>
            <br />

            <Link to="/add-companion">Add Companion </Link>
            <br />

            <Link to="/companions">Companions </Link>

            <br />

            <Link
                to="#"
                onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem("token");
                    location.reload();
                }}
            >
                Logout{" "}
            </Link>
        </div>
    );
};
