import { Link, useNavigate } from "react-router-dom";

function Navbar({ showLogout = true }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top px-4">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/" style={{ color: "#A259FF", fontSize: "24px" }}>
          Evently
        </Link>

        {/* Hamburger Toggle ONLY if showLogout is true (not on login page) */}
        {showLogout && (
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}

        {/* Navbar Items */}
        <div className={showLogout ? "collapse navbar-collapse" : ""} id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Shared for Attendee + Organiser */}
            {(role === "Attendee" || role === "Organiser") && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/my-events">My Events</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/">Discover Events</Link>
                </li>
              </>
            )}

            {/* Admin Navbar */}
            {role === "Admin" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/">Discover Events</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/admin-dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/venues">Venues</Link>
                </li>
              </>
            )}
          </ul>

          {/* Right Side: Logout */}
          {showLogout && (
            <div className="text-white">
              <span className="me-3">Signed In As {user?.role || "Guest"}</span>
              <span
                onClick={handleLogout}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                Logout
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

