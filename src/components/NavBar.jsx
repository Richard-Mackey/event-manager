import { NavLink, useLocation } from "react-router-dom";
import "./NavBar.css";

export default function NavBar({ handleLogout, user }) {
  const location = useLocation();

  const closeNavbar = () => {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.getElementById("navbarNav");

    if (navbarCollapse.classList.contains("show")) {
      navbarToggler.click();
    }
  };

  const getPageTitle = () => {
    if (location.pathname === "/") {
      return user ? `${user.firstName}'s Events` : "Dashboard";
    } else if (location.pathname === "/AddEvent") {
      return "Add an event";
    } else if (location.pathname.startsWith("/EditEvent/")) {
      return "Edit Event";
    } else if (location.pathname === "/Help") {
      return "Help";
    }
    return "";
  };

  return (
    <div className="navbar navbar-expand-lg navbar-dark fixed-top navbar-custom-blue">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/" onClick={closeNavbar}>
          <div className="logoNav"></div>
        </NavLink>

        <span className="navbar-text text-white d-lg-none me-auto page-title-mobile">
          {getPageTitle()}
        </span>

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
              <NavLink to="/" className="nav-link fs-4" onClick={closeNavbar}>
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item me-5">
              <NavLink
                to="/AddEvent"
                className="nav-link fs-4"
                onClick={closeNavbar}
              >
                Add event
              </NavLink>
            </li>
            <li className="nav-item me-5">
              <NavLink
                to="/Help"
                className="nav-link fs-4"
                onClick={closeNavbar}
              >
                Help
              </NavLink>
            </li>
            <li className="nav-item me-5">
              <span
                onClick={() => {
                  closeNavbar();
                  handleLogout();
                }}
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
