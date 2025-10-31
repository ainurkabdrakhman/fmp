import { Navigate } from "react-router-dom";

function ProtectedRoute({ allowedRoles, children }) {
  const userRole = localStorage.getItem("userRole");

  if (!userRole) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default ProtectedRoute;
