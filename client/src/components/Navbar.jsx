import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    isActive ? "nav-link px-3 text-success fw-bold" : "nav-link px-3";

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
        >
          ☰
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/listings">
                Waste Listings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/transport">
                Get Transport
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/register">
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
