import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Style from "./job-listing.module.css"; // Import the CSS file
import { SearchInput } from "../search-input/search-input";
import { SidebarFilter } from "../sidebar-filter/sidebar-filter";
// import Header from "../header/header";

export function JobListing() {
  const [jobs, setJob] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [filterData, setFilterData] = useState({});

  useEffect(()=>{
console.log('parent',filterData);
  },[filterData])

  // Function to handle data received from child component
  const handleFilterChange = (data) => {
    setFilterData(data);
  };

  async function getJobs() {
    const { data } = await axios.get(`http://localhost:8080/jobs`);
    // console.log(data);
    setJob(data.jobs);
  }
  
  // component didMount call every render
  useEffect(() => {
    getJobs();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

// Filter jobs based on search query
const searchFilteredJobs = jobs.filter(
  (job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
);

let filteredJobs = searchFilteredJobs;

console.log("filteredJobs", filteredJobs);

// Check if filterData exists and contains some data
if (filterData && Object.keys(filterData).length > 0) {
  console.log("filterData", filterData);

  // Filter by jobType
  if (filterData.jobType && filterData.jobType.length > 0) {
    console.log("filterData.jobType");
    filteredJobs = filteredJobs.filter(job => filterData.jobType.includes(job.jobType));
  }
  
  // Filter by careerLevel
  if (filterData.careerLevel && filterData.careerLevel.length > 0) {
    console.log("filterData.careerLevel");
    filteredJobs = filteredJobs.filter(job => filterData.careerLevel.includes(job.careerLevel));
  }
  
  // Filter by workPlace
  if (filterData.workPlace && filterData.workPlace.length > 0) {
    console.log("filterData.workPlace");
    filteredJobs = filteredJobs.filter(job => filterData.workPlace.includes(job.workPlace));
  }
}
  return <>
  {/* <Header/> */}
    <section className="bg-gray">
    <div className={Style.layout}>
      <div className={Style.layer}>
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="w-75">
            <p>Find the perfect job for your skills and interests.</p>
            <SearchInput  onChange={handleSearchChange}/>
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-5 container m-auto">
      <div className="col-md-3 h-50 border bg-white me-1">
        <SidebarFilter onFilterChange={handleFilterChange} />
      </div>
      <div className="col-md-8">
      <div className="">
        {filteredJobs.map((job) => (
          <div
            key={job._id}
            to={`/job/${job._id}`}
            className="text-decoration-none  bg-white border mb-3"
          >
            <div className="p-4">
              <div className="pb-1">
              <Link to={`/job/${job._id}`} className="h5 text-primary  text-decoration-none">{job.title}</Link>
              </div>
             <div className="pb-3 h6">
             <span >{job.company} - </span>
             <span className="text-muted" >{job.location}</span>
             </div>
             <div className="pb-3">
             <span className="bg-light px-2 pb-1 rounded me-2 fw-bold text-muted" >{job.jobType}</span>
             <span className="bg-light px-2 pb-1 rounded fw-bold text-muted" >{job.workPlace}</span>
             </div>
             <div className="pb-3 h6">
             <span className=" me-4">{job.careerLevel}</span>
             <span className="">{job.categoryId.title}</span>
             </div>
              <Link to={`/job/${job._id}`} className="btn btn-outline-primary">see more</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </section>
</>
  
}
