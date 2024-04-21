import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import Style from "./applications.module.css"; // Import the CSS file

export function Applications() {
  const [token, setToken] = useState("");
  const [userApplications, setUserApplications] = useState([]);
  // const [showApplicationDetails, setShowApplicationDetails] = useState(false)
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setToken(user?.token || ""); // Ensure token is not null
  }, []);

  const handleShowJobApplication = (jobId)=>{
    setSelectedJobId(jobId)
  }
  const getApplications = useCallback(async () => {
    try {
      if (!token) {
        console.error("Token is missing");
        return;
      }

      const { data } = await axios.get(
        `http://localhost:8080/user/applications`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setUserApplications(data.applicationsJob);

      // console.log(data.applicationsJob[0].applications[1].userApplication.applicationStatus);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  }, [token]);

  useEffect(() => {
    getApplications();
  }, [getApplications]);

  return (
    <>
    <section>
    <div className={Style.layout}>
      <div className={Style.layer}>
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="w-75">
            <h3>Your Applications</h3>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-light">
        <div className="p-3">
          <div className="p-3 m-2">
            {userApplications.map((job) => (
              <div key={job._id} className="application ">
                <div className="row">
                  {/* job details */}
                  <div onClick={() => { handleShowJobApplication(job._id) }} className=" col-md-5 h-50 ms-5 me-3 mb-3 border rounded bg-white">
                    <div className="p-3  cursor-pointer">
                      <h5>{job.title}</h5>
                      <span>{job.company}</span>
                      <span> - </span>
                      <span className="text-muted">{job.location}</span>
                      <div className="mt-2">
                        {job.applications.map((application) => (
                          <div key={application._id}>
                            {application.userApplication && (
                              <span  className={`bg-light p-1 pb-2 px-2 rounded ${
                                application.userApplication.applicationStatus === "pending"
                                  ? "text-primary"
                                  : application.userApplication.applicationStatus === "accepted"
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                                {application.userApplication.applicationStatus}
                              </span>
                              
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {selectedJobId === job._id && (
                    <div className="col-md-6">
                      {/* application details */}
                      {job.applications.map((application) => (
                        // Conditionally render only when userApplication is not null
                        application.userApplication && (
                          <div key={application._id} className="border rounded p-3 bg-white mb-2">
                            <h5 className="text-primary">{job.title}</h5>
                            <div className="pb-3">
                            <span className="h6" >{job.company}</span>
                              <span> - </span>
                              <span className="text-muted h6">{job.location}</span>
                            </div>
                            <div className="pb-3">
                            <span className="text-lead h6">{job.applicationsNumber}</span>
                            <span className="text-muted h6"> Applications</span>
                            </div>
                            <p>Email: {application.userApplication.email}</p>
                            <p>Phone: {application.userApplication.phone}</p>
                            <p>Years of Experience: {application.userApplication.yearsOfExperience}</p>
                            <p>Expected Salary: {application.userApplication.expectedSalary}</p>
                            <p>Cover Letter: {application.userApplication.coverLetter}</p>
                          </div>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
     
    </>
  );
}
