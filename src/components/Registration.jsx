import { useFormik } from "formik";
import { useState } from "react";

const validate = (values) => {
  const errors = {};

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
    errors.password = "Password must be at least 8 characters";
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
  const [registrationError, setRegistrationError] = useState("");
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
        setRegistrationError("");
      } else
        setRegistrationError(
          "Email already exists, please try a different email"
        );
    },
  });

  return (
    <div>
      <div style={{ paddingTop: "80px" }}>
        <h1>Registration page</h1>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input
            className="form-control mb-3 bg-white text-dark"
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
            className="form-control mb-3 bg-white text-dark"
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
            className="form-control mb-3 bg-white text-dark"
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
          <button className="btn btn-primary w-100" type="submit">
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
  );
}
