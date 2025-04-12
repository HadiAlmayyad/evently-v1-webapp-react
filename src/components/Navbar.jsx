// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";

function Navbar({ showLogout = true }) {
  const navigate = useNavigate();

  const handleLogout = () => {

    navigate("/login"); 
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#1A1A1A", padding: "10px 30px" }}>
      <div className="container-fluid d-flex justify-content-between">
        <div>
          <Link className="navbar-brand text-white fw-bold" to="/" style={{ fontSize: "24px" }}>
            Evently
          </Link>
          <Link className="nav-link d-inline text-white mx-3" to="/profile">Profile</Link>
          <Link className="nav-link d-inline text-white mx-3" to="/">My Events</Link>
          <Link className="nav-link d-inline text-white mx-3" to="/">Discover Events</Link>
        </div>

        {showLogout && (
          <div className="text-end">
            <span className="text-white me-2">Signed In As Attendee</span> |{" "}
            <span className="text-white ms-2" style={{ cursor: "pointer", textDecoration: "underline" }} onClick={handleLogout}>
              Logout
            </span>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

