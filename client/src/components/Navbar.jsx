
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

function Navbar() {
  const { user, isAuthLoading,logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () =>{
    try{
      await logout();
      navigate("/login", {
        replace: true,
        state: {
          successMessage: "You have logged out successfully."
        },
      });
    } catch (error) {
      console.error("Could not log out:", error);
    }
  }

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

            {/* Public navigation links */}
            <li className="nav-item">
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
            </li>

            {!isAuthLoading && (
              <>
                {/* Navigation for logged-out users */}
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

                {user && (
                  <li className="nav-item ms-lg-2">
                    <button 
                        type="button"
                        className="btn btn-outline-danger btn-sm px-3"
                        onClick={handleLogout}
                        >
                          Logout
                        </button>
                  </li>
                )}

                {/* Navigation for farmers */}
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

                {/* Navigation for buyers */}
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

                {/* Navigation for drivers */}
                {user?.role === "driver" && (
                  <li className="nav-item">
                    <NavLink to="/transport" className={navLinkClass}>
                      Get Transport
                    </NavLink>
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
