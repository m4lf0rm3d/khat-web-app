import { Link, useLocation } from "react-router-dom";
import { MailOutline, HomeOutline, PersonAddOutline, LogOutOutline } from "react-ionicons";
import './Navbar.css';

export const NavBar = () => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Use useNavigate for programmatic navigation (optional)
    // const navigate = useNavigate();
    // navigate("/");
    window.location.href = "/"; // Redirect for logout (simpler approach)
  };

  return (
    <nav className="navLinks">
      <ul className="nav-list"> {/* Use a class for styling */}
        <li className={`${location.pathname === "/" ? "active" : ""}`}> {/* Active class for current page */}
          <Link to="/">
            <HomeOutline className="nav-icon" /> Home
          </Link>
        </li>
        <li className={`${location.pathname === "/add-companion" ? "active" : ""}`}>
          <Link to="/add-companion">
            <PersonAddOutline className="nav-icon" /> Add Companion
          </Link>
        </li>
        <li className={`${location.pathname === "/companions" ? "active" : ""}`}>
          <Link to="/companions">
            <MailOutline className="nav-icon" /> Companions
          </Link>
        </li>
        <li onClick={handleLogout}>
          <LogOutOutline className="nav-icon" /> Logout
        </li>
      </ul>
    </nav>
  );
};



