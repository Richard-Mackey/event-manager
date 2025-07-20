import { useFormik } from "formik";
import { useState } from "react";

export default function Login({ handleLogin }) {
  const [loginError, setLoginError] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      const loginSuccess = handleLogin(values);
      if (loginSuccess) {
        setLoginError("");
      } else setLoginError("Please enter a correct username and password");
    },
  });

  return (
    <div>
      <div style={{ paddingTop: "80px" }}>
        <h1>Login page</h1>
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
          {loginError && <div>{loginError}</div>}
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
          <button className="btn btn-primary w-100" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
