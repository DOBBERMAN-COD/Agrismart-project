
import { Link, useLocation } from "react-router-dom";

function Unauthorized() {
  const location = useLocation();
  const requiredRole = location.state?.requiredRole;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body p-5">
              <div className="display-3 text-warning mb-3">
                <span role="img" aria-label="Locked">🔒</span>
              </div>

              <h2 className="mb-3">Access Restricted</h2>

              <p className="text-muted mb-3">
                Your account does not have permission to access this page.
              </p>

              {requiredRole && (
                <p className="text-muted">
                  This page is currently restricted to {requiredRole} accounts.
                </p>
              )}

              <Link to="/" className="btn btn-success mt-3">
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
