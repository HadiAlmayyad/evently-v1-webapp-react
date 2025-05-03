import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/" replace />;

  if (!allowedRoles.includes(user.role)) {
    // Optional: redirect to a "Not Authorized" page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
