
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, isAuthLoading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/login", {
        replace: true,
        state: {
          successMessage: "You have logged out successfully.",
        },
      });
    } catch (error) {
      console.error("Could not log out:", error);
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "nav-link px-3 text-success fw-bold"
      : "nav-link px-3";

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          AgriSmart
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
            </li>

            {!isAuthLoading && (
              <>
                {/* Logged-out navigation */}
                {!user && (
                  <>
                    <li className="nav-item">
                      <NavLink to="/listings" className={navLinkClass}>
                        Waste Listings
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/transport" className={navLinkClass}>
                        Get Transport
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/login" className={navLinkClass}>
                        Login
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink
                        to="/register"
                        className="btn btn-success btn-sm px-3 ms-lg-2"
                      >
                        Register
                      </NavLink>
                    </li>
                  </>
                )}

                {/* Farmer navigation */}
                {user?.role === "farmer" && (
                  <>
                    <li className="nav-item">
                      <NavLink to="/listings" className={navLinkClass}>
                        Waste Listings
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/my-listings" className={navLinkClass}>
                        My Listings
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/create-listing" className={navLinkClass}>
                        Create Listing
                      </NavLink>
                    </li>
                  </>
                )}

                {/* Buyer navigation */}
                {user?.role === "buyer" && (
                  <>
                    <li className="nav-item">
                      <NavLink to="/listings" className={navLinkClass}>
                        Waste Listings
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/transport" className={navLinkClass}>
                        Get Transport
                      </NavLink>
                    </li>
                  </>
                )}

                {/* Driver navigation */}
                {user?.role === "driver" && (
                  <li className="nav-item">
                    <NavLink to="/transport" className={navLinkClass}>
                      Get Transport
                    </NavLink>
                  </li>
                )}

                {/* Authenticated user's account menu */}
                {user && (
                  <li className="nav-item dropdown ms-lg-3">
                    <button
                      className="btn btn-outline-success dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user.name || "My Account"}
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <span className="dropdown-item-text">
                          <strong>{user.role}</strong>
                        </span>
                      </li>

                      <li>
                        <hr className="dropdown-divider" />
                      </li>

                      <li>
                        <button
                          type="button"
                          className="dropdown-item text-danger"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
