import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate,useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";


export function LogIn() {
  const { jobId } = useParams(); // Use useParams hook to get the job ID
 // console.log(jobId);
  const {setUserToken} = useContext(UserContext)
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  async function submitLogin(values) {
    // console.log('values',values);
    const response = await axios
      .post(`http://localhost:8080/auth/login`, values)
      .catch((error) => {
        const errorMessage = error.response.data.message[0]
        // console.log(errorMessage.message);
        setError(errorMessage.message)
      });
    if (response.data.success === true) {
      setError(null)
      // console.log(response.data.success);
      // console.log("user", response.data.user);
      const user =JSON.stringify(response.data.user);
      localStorage.setItem('user', user);
      setUserToken(user)
      if (jobId) {
        navigate(`/job/${jobId}`);
      }else{
        if (response.data.user.role === 'Admin') {
          navigate("/admin-dashboard");
        } else {
          navigate("/jobs");
        }
      }
     
    }
  }
  let validationSchema = Yup.object({
    email: Yup.string().email("in-valid email").required("email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("password is required")
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitLogin,
  });
  return (
    <>
    <div className="vh-100">
    <div className="w-50 mx-auto p-5 m-5 bg-light border rounded ">
        {error !== null? <div className="alert alert-danger">{error}</div>:''}
        <h2>Log In and Start Applying For Jobs</h2>
        <form onSubmit={formik.handleSubmit}>
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

          <button type="submit" className="btn btn-primary mt-2">
            Log In
          </button>
        </form>

        <p className="mt-3">
          You don't have an account? 
          <Link className="text-decoration-none" to='/signup'>
          <a className="text-decoration-none" >   Register Now</a>
          </Link>
        </p>
      </div>
    </div>
     
    </>
  );
}
