import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar navbar-expand-lg navbar-dark fixed-top navbar-custom-blue">
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
      </ul>
    </div>
  );
}
