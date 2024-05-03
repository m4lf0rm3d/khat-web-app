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
          <Link style={{textDecoration: "none"}} to="/">
            <HomeOutline className="nav-icon" />
          </Link>
        </li>
        <li className={`${location.pathname === "/add-companion" ? "active" : ""}`}>
          <Link style={{textDecoration: "none"}} to="/add-companion">
            <PersonAddOutline className="nav-icon" />
          </Link>
        </li>
        <li className={`${location.pathname === "/companions" ? "active" : ""}`}>
          <Link style={{textDecoration: "none"}} to="/companions">
            <MailOutline className="nav-icon" /> 
          </Link>
        </li>
        <li style={{textDecoration: "none"}} onClick={handleLogout}>
          <LogOutOutline className="nav-icon" /> 
        </li>
      </ul>
    </nav>
  );
};



