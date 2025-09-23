import { useFormik } from "formik";
import { useState } from "react";
import "./Registration.css";
import { useEffect } from "react";

const validate = (values) => {
  const errors = {};
  // Required field validation - ensures no empty submissions
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password =
      "Password must be at least 8 characters, contain at least one capital letter, one lowercase letter, one special character and no spaces";
  } else if (
    !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/i.test(
      values.password
    )
  ) {
    errors.password =
      "Password must contain at least one uppercase and lowercase letter, a number and a special case character";
  }

  return errors;
};
export default function Registration({
  handleRegistration, // Change from handleLogin
  setLogin,
  backgroundImage,
  setBackgroundImage,
}) {
  const [registrationError, setRegistrationError] = useState("");
  // Application of page-specific styling as the dashboard has different css properties and doing this stops it interfering
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
  // Track registration-specific errors

  // Use of Formik for form state management and validation
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
    },
    validate,
    onSubmit: (values) => {
      const registrationSuccess = handleRegistration(values);
      if (registrationSuccess) {
        // Clear any previous errors
        setRegistrationError("");
      } else
        setRegistrationError(
          "Email already exists, please try a different email"
        );
    },
  });

  return (
    <div>
      <div className="login-page container text-center">
        <h2 className="display-5 text-center registration-page-title pt-4">
          Event planner
        </h2>
        <div className="row justify-content-center">
          <div className="col-12 mb-4 change-display-buttons"></div>
          {/* Responsive registration form container */}
          <div className="col-md-6 col-lg-4 bg-white p-4 rounded shadow registration-page-form">
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="email">Email Address</label>
              {/* Email field with validation */}
              <input
                className="form-control mb-4 bg-white text-dark"
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {/* Display validation errors only after user interaction */}
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
              {registrationError && <div>{registrationError}</div>}
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
              <label htmlFor="firstName">First name</label>
              <input
                className="form-control mb-4 bg-white text-dark"
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div>{formik.errors.firstName}</div>
              ) : null}
              {/* Form actions */}
              <button className="btn btn-primary w-100 mb-3" type="submit">
                Register
              </button>
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={() => setLogin("login")}
              >
                Already have an account? Login here
              </button>
            </form>
          </div>
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
