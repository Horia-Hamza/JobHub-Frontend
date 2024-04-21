import React, { useContext, useState } from "react";
import "./RegistrationForm.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export function Authentication() {
  const { setUserToken } = useContext(UserContext);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function submitRegister(values) {
    // console.log(values);
    const response = await axios
      .post(`http://localhost:8080/auth/signup`, values)

      .catch((error) => {
        const errorMessage = error.response.data.message[0];
        console.log(errorMessage.message);
        setError(errorMessage.message);
      });
    if (response.data.success === true) {
      setError("");

      console.log(response.data.success);
      console.log("response.data.newUser", response.data.newUser);

      const user = JSON.stringify(response.data.newUser);
      localStorage.setItem("user", user);
      setUserToken(user);
      navigate("/jobs");
    }
  }
  let validationSchema = Yup.object({
    name: Yup.string().min(6, "min length is 6").required("name is required"),
    email: Yup.string().email("in-valid email").required("email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "password and rePassword don not match!"
      )
      .required("rePassword is required"),
    role: Yup.string().required("Role is required"), // Add role validation
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      role: "", // Add role as part of the initial values
    },
    validationSchema,
    onSubmit: submitRegister,
  });
  return (
    <>
      <div className="w-50 mx-auto p-5 m-5 bg-light border rounded">
        {error !== null ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          ""
        )}

        <h2>Sign Up and Start Applying For Jobs</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* name start */}
          <div>
            <label htmlFor="firstName">Name :</label>
            <input
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              type="text"
              className="form-control w-100 mb-2"
              id="name"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="alert alert-danger mt-2 p-2">
                {formik.errors.name}
              </div>
            ) : null}
          </div>

          {/* email start */}
          <div>
            <label htmlFor="email">Email :</label>
            <input
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              type="text"
              className="form-control w-100 mb-2"
              id="email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="alert alert-danger mt-2 p-2">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          {/* password start */}
          <div>
            <label htmlFor="password">Password :</label>
            <input
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              type="password"
              className="form-control w-100 mb-2"
              id="password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="alert alert-danger mt-2 p-2">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          {/* rePassword start */}
          <div>
            <label htmlFor="rePassword">Confirm Password :</label>
            <input
              name="rePassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rePassword}
              type="password"
              className="form-control w-100 mb-2"
              id="rePassword"
            />
            {formik.touched.rePassword && formik.errors.rePassword ? (
              <div className="alert alert-danger mt-2 p-2">
                {formik.errors.rePassword}
              </div>
            ) : null}
          </div>
          {/* checks start */}
          <div className="my-3 ">
            <div className="form-check form-check-inline ">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                id="lookingForJob"
                value="User" // Set the value for the Job Seeker option
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.role === "User"} // Check if this option is selected
              />
              <label className="form-check-label" htmlFor="lookingForJob">
                Looking for a job?
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                id="employer"
                value="Admin" // Set the value for the Employer option
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.role === "Admin"} // Check if this option is selected
              />
              <label className="form-check-label" htmlFor="employer">
                Employer?
              </label>
            </div>

            {formik.touched.role && formik.errors.role ? (
              <div className="alert alert-danger mt-2 p-2">
                {formik.errors.role}
              </div>
            ) : null}
          </div>

          <button type="submit" className="btn btn-primary mt-2">
            Register Now
          </button>
        </form>

        <p className="mt-3">
          Do you have an account?
          <Link className="text-decoration-none" to="/login">
            <a className="text-decoration-none"> Sign In</a>
          </Link>
        </p>
      </div>
    </>
  );
}
