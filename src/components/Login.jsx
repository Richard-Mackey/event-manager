import { useFormik } from "formik";
import { useState } from "react";
import "./Login.css";
import { useEffect } from "react";

export default function Login({ handleLogin, setLogin }) {
  useEffect(() => {
    // Apply login page specific styling to match registration page
    document.body.style.background = "rgb(216, 214, 213)";
    document.body.style.margin = "0px";
    document.body.style.border = "50px solid white";

    document.documentElement.style.background = "rgb(216, 214, 213)";
    document.documentElement.style.margin = "0px";
    document.documentElement.style.padding = "0px";

    return () => {
      // Cleanup function: Reset styles to avoid any overlapping css from other files
      document.body.style.background = "";
      document.body.style.margin = "";
      document.body.style.border = "";
      document.documentElement.style.background = "";
      document.documentElement.style.margin = "";
      document.documentElement.style.padding = "";
    };
  }, []);
  // State management for authentication errors
  const [loginError, setLoginError] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      const loginSuccess = handleLogin(values);
      if (loginSuccess) {
        // Clear previous error states on successful login
        setLoginError("");
      } else setLoginError("Please enter a correct username and password");
    },
  });

  return (
    <div className="login-page container text-center pt-4">
      <div className="row justify-content-center">
        {/* Application branding section - consistent with registration */}
        <div className="col-12 mb-4">
          <h2 className="display-5 text-center">Event planner</h2>
          <div className="logoLogin"></div>
        </div>
        {/* Responsive login form container */}
        <div className="col-md-6 col-lg-4 bg-white p-4 rounded shadow">
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
              className="form-control mb-4 bg-white text-dark"
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
            <label htmlFor="password">Password</label>
            <input
              className="form-control mb-4 bg-white text-dark"
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {loginError && <div>{loginError}</div>}
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
            <button className="btn btn-primary w-100 mb-3" type="submit">
              Submit
            </button>
            {/* Easy transition to registration if user hasn't yet registered*/}
            <button
              className="btn btn-primary w-100"
              onClick={() => setLogin("register")}
            >
              Don't have an account? Register here
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
