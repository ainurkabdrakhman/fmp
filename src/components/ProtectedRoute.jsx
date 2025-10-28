// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ allowedRoles, children }) {
  const userRole = localStorage.getItem("userRole");

  if (!userRole) {
    // пользователь не залогинен
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(userRole)) {
    // пользователь не имеет права
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default ProtectedRoute;
