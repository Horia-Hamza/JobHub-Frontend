import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CreateJobForm from "../create-job-form/create-job-form"; // Import your JobForm component
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useFormik } from "formik";

export default function Dashboard() {
  const [message, setMessage] = useState("Select a job to view details");
  const [applicationMessage, setApplicationMessage] = useState("");
  const [noApplicationsMsg, setNoApplicationsMsg] = useState(null);

  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [applications, setApplications] = useState([]);
  const [jobId, setJobId] = useState("");
  const [token, setToken] = useState("");
  const [isJob, setIsJob] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [categoryId, setCategoryId] = useState("")
  const [showApplications, setShowApplications] = useState(false);
  const [showCreateJobApplication, setShowCreateJobApplication] =
    useState(false);
  const [showUpdateJobApplication, setShowUpdateJobApplication] =
    useState(false);
    const [applicationId, setApplicationId] = useState(null);
    const [user, setUser] = useState(null);

  const callSetShowUpdateJobApplication = (id) => {
    console.log("id", id);
    setShowUpdateJobApplication(true);
    setApplicationId(id);
  };

  const { userToken } = useContext(UserContext);
  const navigate = useNavigate();

  //  console.log("userToken",userToken);
  useEffect(() => {
    console.log(noApplicationsMsg);
  }, [noApplicationsMsg]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setToken(user?.token);
    if (!user) {
      // If user is not logged in, navigate to login
      navigate("/login")
    }
  }, [user]);

  // Fetch the list of jobs when the component mounts
  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/jobs");
      setJobs(response.data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs(); // Call fetchJobs when the component mounts
  }, []);

  useEffect(() => {
    console.log("selectedJob",selectedJob);
    console.log("categoryId",categoryId);
    }, [selectedJob,categoryId]);

  // create job btn
  const handleCreateJob = () => {
    setShowCreateJobApplication(true);
    setJobId(null);
    setSelectedJob(null);
    getCategories()
  };
  const getCategories = async ()=>{
    const {data} = await axios.get(
      `http://localhost:8080/categories`,
  
      {
        headers: {
          Authorization: token,
        },
      }
    );
    // console.log('data.title',data.title);
    setCategories(data.categories)
  }
  // job details
  const handleJobClick = async (jobId) => {
    try {
      const response = await axios.get(`http://localhost:8080/job/${jobId}`);
      setSelectedJob(response.data.job);
      setCategoryId(response.data.job.categoryId)

      setIsJob(true);
      setShowCreateJobApplication(false);
      setShowApplications(false);
      setJobId(response.data.job._id);
      // console.log(response.data.job._id);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  // update job btn
  const handleUpdateJob = async () => {
    try {
      // setCategoryId(selectedJob.categoryId)
      console.log('categoryId dash',categoryId);
      setShowCreateJobApplication(true);
      getCategories()
    } catch (error) {
      console.error("Error fetching handleUpdateJob:", error);
    }
  };

  // cancel job btn
  const handelCancel = () => {
    setShowCreateJobApplication(false);
    if (isJob === false) {
      return setMessage("Select a job to view details");
    } else {
      return setIsJob(true);
    }
  };

  // delete job btn
  const handleDeleteJob = async () => {
    try {
      if (categoryId) {
        const { data } = await axios.delete(
          `http://localhost:8080/admin/delete-job/${jobId}/${categoryId}`,
          {
            headers: { Authorization: token },
          }
        );
        // console.log(data);
        setIsJob(false);
        setJobs(data.jobs);
        setSelectedJob(null);
        setShowApplications(false); // Hide applications when deleting a job
        setMessage("job deleted successfully");
      }
    } catch (error) {
      console.log("error handleDeleteJob", error);
    }
  };
  // get applications btn
  const handleGetApplications = async (jobId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/admin/job/${jobId}/applications`,
        {
          headers: { Authorization: token },
        }
      );
      if (data.applications.length === 0) {
        setNoApplicationsMsg("No applications found!");
      } else {
        setShowApplications(true);
        setApplications(data.applications);
        console.log(applications);
      }
    } catch (error) {
      if (error.response.data.message === "No applications found") {
        setNoApplicationsMsg("no applications found!");
        console.log(noApplicationsMsg);
      }
    }
  };

  const handleStatusUpdate = async (applicationId, status) => {
    console.log("status", status);
    console.log("applicationId", applicationId);
    try {
      const { data } = await axios.put(
        `http://localhost:8080/admin/update-application/${applicationId}`,
        status,
        {
          headers: { Authorization: token },
        }
      );
      handleGetApplications(jobId);
      console.log(data.updatedApplication.applicationStatus);
    } catch (error) {
      console.error(error);
      setApplicationMessage(error.response.data.message[0].message);
    }
  };

  const formik = useFormik({
    initialValues: {
      applicationStatus: "",
    },
    onSubmit: (values) => handleStatusUpdate(applicationId, values),
  });

  return (
    <div className="container-fluid bg-light">
      <div className="row container-fluid">
        <div className="col-md-4 px-5 py-3 border-end vh-100">
          <button
            onClick={handleCreateJob}
            className="btn btn-primary mb-3 w-100 mt-5"
          >
            Create Job
          </button>
          <ul className="list-group">
            {jobs.map((job) => (
              <li
                key={job._id}
                className="list-group-item clickable"
                onClick={() => handleJobClick(job._id)}
                style={{ cursor: 'pointer' }} 
              >
                {job.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-5  py-3 pt-5">
          {showCreateJobApplication ? (
            // Render job creation form
            <CreateJobForm
              hambozo={{
                fetchJobs,
                handleJobClick,
                handelCancel,
                jobId,
                selectedJob,
                categories,
                categoryId
              }}
            />
          ) : isJob ? (
            <div className="bg-white border rounded p-3">
              <h2 className="text-primary mb-3">{selectedJob.title}</h2>
              <p className="mb-4">
                <span className="text-secondary">Company: </span>
                {selectedJob.company}
              </p>
              <p className="mb-4">
                <span className="text-secondary">Location: </span>
                {selectedJob.location}
              </p>
              <p className="mb-4">
                <span className="text-secondary">Description: </span>
                {selectedJob.description}
              </p>
              <p className="mb-4">
                <span className="text-secondary">Requirements: </span>
                {selectedJob.requirements}
              </p>
              <div className="mb-4 d-flex justify-content-start align-items-center">
  <p className="pe-5 d-flex">
    <span className="text-secondary">Applications Number: </span>
    {selectedJob.applicationsNumber}
  </p>

</div>
              <div className="mt-5">
                <button
                  onClick={() => handleUpdateJob(jobId)}
                  className="btn btn-info me-2"
                >
                  Update Job
                </button>
                <button
                  onClick={() => handleDeleteJob(jobId)}
                  className="btn btn-danger me-2"
                >
                  Delete Job
                </button>
                {selectedJob.applicationsNumber > 0 && (
    <button
      onClick={() => handleGetApplications(jobId)}
      className="btn btn-success"
    >
      Get Applications
    </button>
  )}
              </div>
            </div>
          ) : (
            <p>{message}</p>
          )}
        </div>

        {showApplications ? (
          // Render application details here
          <div className=" col-md-3">
            <div className="my-2 py-3 pt-5">
              <h5 className="px-2 pb-2">
                Applications for {selectedJob?.title}
              </h5>
              {applications.map((application) => (
                <div
                  key={application._id}
                  className="border rounded p-3 mb-2 bg-white"
                >
                  <div className="pb-3">
                    <span className="text-muted">email </span>
                    <p>{application.email}</p>
                  </div>
                  <div className="pb-3">
                    <span className="text-muted">phone </span>
                    <p>{application.phone}</p>
                  </div>

                  <div className="pb-3">
                    <span className="text-muted">experience </span>
                    <p>{application.yearsOfExperience}</p>
                  </div>
                  <div className="pb-3">
                    <span className="text-muted">salary </span>
                    <p>{application.expectedSalary}</p>
                  </div>
                  <div className="pb-3">
                    <span className="text-muted">cover letter </span>
                    <p>{application.coverLetter}</p>
                  </div>
                  <div className="pb-3">
                    <span>applicationStatus: </span>
                    <span
                      className={`text-white p-1 pb-2 px-2 rounded ${
                        application.applicationStatus === "pending"
                          ? "bg-primary"
                          : application.applicationStatus === "accepted"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {application.applicationStatus}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      callSetShowUpdateJobApplication(application._id)
                    }
                    className="btn btn-outline-primary mb-3"
                  >
                    update status
                  </button>
                  {/* Use Formik for the update status form */}
                  {showUpdateJobApplication === true &&
                  applicationId === application._id ? (
                    <form onSubmit={formik.handleSubmit}>
                      <div className="mb-4">
                        <label
                          htmlFor={`statusDropdown_${application.id}`}
                          className="form-label"
                        >
                          Update Application Status:
                        </label>
                        <select
                          className="form-select"
                          id={`statusDropdown_${applicationId}`}
                          name="applicationStatus"
                          value={formik.values.applicationStatus}
                          onChange={formik.handleChange}
                        >
                          <option value="">Select Status</option>
                          <option value="pending">Pending</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                        {applicationMessage ? (
                          <div className="alert alert-danger p-2 mt-2">
                            {applicationMessage}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Update Status
                      </button>
                    </form>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h1>{noApplicationsMsg}</h1>
          </div>
        )}
      </div>
    </div>
  );
}
