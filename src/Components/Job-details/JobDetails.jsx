import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const JobDetails = () => {
  const { jobId } = useParams(); // Use useParams hook to get the job ID
  const [jobDetails, setJobDetails] = useState(null);
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [])

  useEffect(() => {
    if (user != null) {
      console.log(user.role);
    }else{
      setMessage('log in first')
      console.log('log in first');
    }

  }, [user]) 

  
   useEffect(() => {
    const fetchJobDetails = async () => {
      try { 
        const {data} = await axios.get(`http://localhost:8080/job/${jobId}`);
        console.log(data);
        setJobDetails(data.job);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (!jobDetails) {
    return <div>Loading...</div>;
  }

  const getId = ()=>{
console.log(jobDetails._id);
  }
  return (
    <div className="container py-5 ">
      <div className="row">
        <div className="col-md-12">
          <div className="job-details p-4 my-3 border bg-white">
            <h2 className="h4 text-primary mb-3">{jobDetails.title}</h2>
            <div>
            <p className="mb-4">
              <span className="text-secondary">Company: </span>{jobDetails.company}
            </p>
            <p className="mb-4">
              <span className="text-secondary">Location: </span>{jobDetails.location}
            </p>
            <p className="mb-4">
              <span className="text-secondary">Description: </span>{jobDetails.description}
            </p>
            <p className="mb-4">
              <span className="text-secondary">Requirements: </span>{jobDetails.requirements}
            </p>
            <p className="mb-4">
              <span className="text-secondary">Applications Number: </span>{jobDetails.applicationsNumber}
            </p>
            </div>
            <div className="pb-3">
             <span className="bg-light px-2 pb-1 rounded me-2 fw-bold text-muted" >{jobDetails.jobType}</span>
             <span className="bg-light px-2 pb-1 rounded fw-bold text-muted" >{jobDetails.workPlace}</span>
             </div>
             <div className="pb-3 h6">
             <span className=" me-4">{jobDetails.careerLevel}</span>
             <span className="">{jobDetails.categoryId.title}</span>
             </div>
            {/* applicationsNumber */}
{user === null?(
  <div>
    {/* <span className="text-lead">to apply for this job you have to log in first </span> */}
<Link to={`/login/${jobDetails._id}`}>
   <button onClick={getId} type="button" className="btn btn-primary me-2">
   Apply for this Job
   </button>
 </Link>
  </div>
   
):null}
{message != null && user?.role === 'User'?(
    <Link to={`/job/${jobDetails._id}/apply`} className="btn btn-outline-primary ms-2 mt-2">
    Apply for this Job
    </Link>
):null}
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
