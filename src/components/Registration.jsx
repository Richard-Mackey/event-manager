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
export default function Registration({ handleRegistration, setLogin }) {
  // Application of page-specific styling as the dashboard has different css properties and doing this stops it interfering
  useEffect(() => {
    // Set body styles
    document.body.style.background = "rgb(216, 214, 213)";
    document.body.style.margin = "0px";
    document.body.style.border = "50px solid white";

    document.documentElement.style.background = "rgb(216, 214, 213)";
    document.documentElement.style.margin = "0px";
    document.documentElement.style.padding = "0px";

    return () => {
      // Cleanup when leaving the page
      document.body.style.background = "";
      document.body.style.margin = "";
      document.body.style.border = "";
      document.documentElement.style.background = "";
      document.documentElement.style.margin = "";
      document.documentElement.style.padding = "";
    };
  }, []);
  // Track registration-specific errors
  const [registrationError, setRegistrationError] = useState("");
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
      <div className="registration-page container text-center pt-4">
        <div className="row justify-content-center">
          <div className="col-12 mb-4">
            <h2 className="display-5 text-center">Event planner</h2>
            <div className="logoLogin"></div>
          </div>
          {/* Responsive registration form container */}
          <div className="col-md-6 col-lg-4 bg-white p-4 rounded shadow">
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
                className="btn btn-primary w-100"
                onClick={() => setLogin("login")}
              >
                Already have an account? Login here
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
