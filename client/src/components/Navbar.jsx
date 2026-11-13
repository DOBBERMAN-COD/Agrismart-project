
import { Link, NavLink } from "react-router-dom";

function Navbar() {
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
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>

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
              <NavLink to="/my-listings" className={navLinkClass}>
                My Listings
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/create-listing" className={navLinkClass}>
                Create Listing
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

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
