import { Link, useNavigate } from "react-router-dom";

function Navbar({ showLogout = true }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const role = user?.role;

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#1A1A1A", padding: "10px 30px" }}>
      <div className="container-fluid d-flex justify-content-between">
        <div>
          <Link className="navbar-brand fw-bold" to="/" style={{ color: "#7b2cbf", fontSize: "24px" }}>
            Evently
          </Link>

          {/* Shared for Attendee + Organizer */}
          {(role === "Attendee" || role === "Organizer") && (
            <>
              <Link className="nav-link d-inline text-white mx-3" to="/profile">Profile</Link>
              <Link className="nav-link d-inline text-white mx-3" to="/">My Events</Link>
              <Link className="nav-link d-inline text-white mx-3" to="/">Discover Events</Link>
            </>
          )}

          {/* Admin Nav */}
          {role === "Admin" && (
            <>
              <Link className="nav-link d-inline text-white mx-3" to="/profile">Profile</Link>
              <Link className="nav-link d-inline text-white mx-3" to="/">Discover Events</Link>
              <Link className="nav-link d-inline text-white mx-3" to="/dashboard">Dashboard</Link>
              <Link className="nav-link d-inline text-white mx-3" to="/venues">Venues</Link>
            </>
          )}
        </div>

        {showLogout && (
          <div className="text-end">
            <span className="text-white me-2">
              Signed In As {user?.role || "Guest"}
            </span>{" "}
            |{" "}
            <span
              className="text-white ms-2"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={handleLogout}
            >
              Logout
            </span>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
