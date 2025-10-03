import { useFormik } from "formik";
import { useState } from "react";
import "./Login.css";
import { useEffect } from "react";

export default function Login({
  handleLogin,
  setLogin,
  backgroundImage,
  setBackgroundImage,
}) {
  const [loginError, setLoginError] = useState("");
  useEffect(() => {
    // Apply login page specific styling to match registration page
    document.body.style.background = "rgb(216, 214, 213)";
    document.body.style.margin = "0px";
    document.body.style.border = "70px solid white";
    document.body.style.padding = "0";
    document.body.style.height = "100vh"; // Use height instead of minHeight
    document.body.style.overflow = "hidden";
    document.body.style.boxSizing = "border-box"; // Include border in height calculation

    document.documentElement.style.background = "rgb(216, 214, 213)";
    document.documentElement.style.margin = "0px";
    document.documentElement.style.padding = "0px";
    document.documentElement.style.height = "100%";

    document.documentElement.style.setProperty(
      "--watermark-image",
      `url(${backgroundImage})`
    );

    return () => {
      // Cleanup when leaving the page
      document.body.style.background = "";
      document.body.style.margin = "";
      document.body.style.border = "";
      document.body.style.padding = "";
      document.body.style.height = "";
      document.body.style.overflow = "";
      document.body.style.boxSizing = "";
      document.documentElement.style.background = "";
      document.documentElement.style.margin = "";
      document.documentElement.style.padding = "";
      document.documentElement.style.height = "";
    };
  }, [backgroundImage]);
  // State management for authentication errors

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
    <div className="login-page container text-center">
      <h2 className="display-5 text-center login-page-title">Event planner</h2>

      <div className="row justify-content-center">
        {/* Application branding section - consistent with registration */}

        {/* Responsive login form container */}
        <div className="col-md-6 col-lg-4 bg-white p-4 rounded shadow login-form">
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
              type="button"
              className="btn btn-primary w-100"
              onClick={() => setLogin("register")}
            >
              Don't have an account? Register here
            </button>
          </form>
        </div>
      </div>
      <div className="background-options">
        <img
          src="/checklist.svg"
          className="rounded float-end ms-5"
          alt="checklist image"
          height="50px"
          onClick={() => setBackgroundImage("/checklist.svg")}
        ></img>
        <img
          src="/pencil.svg"
          className="rounded float-end ms-5"
          alt="checklist image"
          height="50px"
          onClick={() => setBackgroundImage("/pencil.svg")}
        ></img>
        <img
          src="/time_planner.jpg"
          className="rounded float-end ms-5"
          alt="checklist image"
          height="50px"
          onClick={() => setBackgroundImage("/time_planner.jpg")}
        ></img>
      </div>
    </div>
  );
}
