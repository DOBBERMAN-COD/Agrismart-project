
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthLoading } = useAuth();
  const location = useLocation();

  // Wait until the existing session has been checked.
  if (isAuthLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Checking your session...</p>
      </div>
    );
  }

  // Redirect users who are not logged in.
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Check whether the user's role is permitted.
 if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
        <Navigate 
          to="/unauthorized"
          replace
          state={{
            requiredRole: allowedRoles.join(" or "),
          }}
          />
    );
 }

  return children;
}

export default ProtectedRoute;
