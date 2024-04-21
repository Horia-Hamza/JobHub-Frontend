import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ApplicationForm() {
  const navigate = useNavigate();
  const { jobId } = useParams();

  const [formData, setFormData] = useState({

    email: "",
    phone: "",
    yearsOfExperience: "",
    expectedSalary: "",
    coverLetter: "",
  });

  const [token, setToken] = useState("");
  const [errMsg, setErrMsg] = useState(null);
  const [successMsg, setSuccussMsg] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setToken(user.token);
    // console.log(user.token);
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    //  console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send application data to the server
      const response = await axios.post(
        `http://localhost:8080/job/${jobId}/submit-application`,
        formData,
        {
          headers: {
            authorization: token,
          },
        }
      );

      // Handle the response (e.g., show success message, navigate to a new page)
      console.log(
        // "Application submitted successfully:",
        response.data
      );
      setSuccussMsg("Application submitted successfully");

      // Reset the form
      setFormData({
        email: "",
        phone: "",
        yearsOfExperience: "",
        expectedSalary: "",
        coverLetter: "",
      });

      navigate('/user-applications')
    } catch (error) {
      console.log(error);
      if (error.response.data?.message[0]) {
        setErrMsg(error.response.data.message[0].message);
        console.error(
          "Error submitting application:",
          error.response.data.message[0].message
        );
      }
      // Handle errors (e.g., show error message)
      // console.error("Error submitting application:", error);
    }
  };

  return (
    <>
      <div className="container-fluid py-5 bg-light">
        <div className="row justify-content-center">
          <div className="col-md-6 bg-white border p-5">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                {errMsg !== null ? (
                  <div className="alert alert-danger">{errMsg}</div>
                ) : (
                  ""
                )}
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="yearsOfExperience" className="form-label">
                  Years of Experience
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="expectedSalary" className="form-label">
                  Expected Salary
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="expectedSalary"
                  name="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="coverLetter" className="form-label">
                  Cover Letter
                </label>
                <textarea
                  className="form-control"
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  required
                />
              </div>
              {successMsg !== null ? (
                <div className="alert alert-success">{successMsg}</div>
              ) : (
                ""
              )}
              <button type="submit" className="btn btn-primary">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
