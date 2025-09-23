import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar({ handleLogout }) {
  return (
    <div className="navbar navbar-expand-lg navbar-dark fixed-top navbar-custom-blue">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <div className="logoNav"></div>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item me-5">
              <NavLink to="/" className="nav-link fs-4">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item me-5">
              <NavLink to="/AddEvent" className="nav-link fs-4">
                Add event
              </NavLink>
            </li>
            <li className="nav-item me-5">
              <NavLink to="/Help" className="nav-link fs-4">
                Help
              </NavLink>
            </li>
            <li className="nav-item me-5">
              <span
                onClick={handleLogout}
                className="nav-link fs-4"
                style={{ cursor: "pointer" }}
              >
                Log out
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
