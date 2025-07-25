import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div className="navbar navbar-expand-lg navbar-dark fixed-top navbar-custom-blue">
      <div className="container-fluid">
        {/* Brand/Logo section with routing to home/dashboard */}
        <NavLink className="navbar-brand" to="/">
          <div className="logoNav"></div>
        </NavLink>

        {/* Hamburger button - only shows on mobile
        Implements Bootstrap collapse functionality for responsive navigation
        Includes proper ARIA attributes for screen reader accessibility */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {/* Standard Bootstrap hamburger icon */}
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 
         * Collapsible navigation content
         Hidden on mobile by default as mobile uses hamburger button
         Always visible on larger screens (lg breakpoint and above)
         */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item me-5">
              {/* Dashboard navigation link */}
              <NavLink to="/" className="nav-link fs-4">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item me-5">
              {/* Add event navigation link */}
              <NavLink to="/AddEvent" className="nav-link fs-4">
                Add event
              </NavLink>
            </li>
            <li className="nav-item me-5">
              {/* Help page navigation link */}
              <NavLink to="/Help" className="nav-link fs-4">
                Help
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
