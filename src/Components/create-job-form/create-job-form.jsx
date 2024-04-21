import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateJobForm = ({ hambozo }) => {
  const [token, setToken] = useState("");
  const [jobId, setJobId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  // const [categories, setCategories] = useState("");
  const [workPlaceMessage, setWorkPlaceMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setToken(user.token);
    console.log("categoryId", categoryId);
  }, [categoryId]);

  // // Function to handle form submission
  const handleSubmit = async (values) => {
    try {
      if (hambozo.jobId) {
        setCategoryId(hambozo.categoryId);
        setJobId(hambozo.jobId);
        // UpdateJob(jobId,values);
        return;
      } else {
        const response = await axios.post(
          `http://localhost:8080/admin/create-job`,
          values,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        // Handle the API response
        console.log(response.data.newJob);
        hambozo.fetchJobs();
        hambozo.handleJobClick(response.data.newJob._id);
        console.log("create");

        // console.log(response.data.newJob);
      }
    } catch (error) {
      console.error("Error handling job:", error);
    }
  };

  let validationSchema = Yup.object({
    title: Yup.string().required("title is required"),
    categoryId: Yup.string().required("categoryId is required"),
    description: Yup.string().required("description is required"),
    company: Yup.string().required("company is required"),
    location: Yup.string().required("location is required"),
    requirements: Yup.string().required("requirements is required"),
    workPlace: Yup.string().required("workPlace is required"),
    careerLevel: Yup.string().required("careerLevel is required"),
    jobType: Yup.string().required("jobType is required"),
  });

  const UpdateJob = async (jobId, values) => {
    try {
      // send new values
      // console.log("categoryIdddddd",categoryId);
      const { data } = await axios.put(
        `http://localhost:8080/admin/update-job/${hambozo.jobId}`,
        values,
        {
          headers: { Authorization: token },
        }
      );
      console.log(data.updatedJob);
      hambozo.fetchJobs();
      hambozo.handleJobClick(data.updatedJob._id);
      console.log("update");
      // setSelectedJob(data.job);
      // setJobId(data.job._id);
    } catch (error) {
      console.error("Error fetching handleUpdateJob:", error);
    }
  };
  let formik = useFormik({
    initialValues: {
      title: "",
      categoryId: "",
      description: "",
      company: "",
      location: "",
      requirements: "",
      workPlace: "",
      careerLevel: "",
      jobType: "",
    },
    validationSchema,

    onSubmit: (values) => handleSubmit(values),
  });

  // Effect to set form values when job details are available
  useEffect(() => {
    if (hambozo.selectedJob) {
      console.log("Job details:", hambozo.selectedJob); // Log the job details
      // console.log("categoryId:", hambozo.selectedJob.categoryId); // Log the job details

      // Set form values when job details are available for update
      formik.setValues({
        title: hambozo.selectedJob.title,
        categoryId: hambozo.selectedJob.categoryId,
        description: hambozo.selectedJob.description,
        company: hambozo.selectedJob.company,
        location: hambozo.selectedJob.location,
        requirements: hambozo.selectedJob.requirements,
        workPlace: hambozo.selectedJob.workPlace,
        careerLevel: hambozo.selectedJob.careerLevel,
        jobType: hambozo.selectedJob.jobType,
      });
    }
  }, [hambozo.jobDetails]);

  const handleUpdateClick = () => {
    // Check if any form field is empty
    const isFormEmpty = Object.values(formik.values).some((value) => !value);
    if (isFormEmpty) {
      // Optionally display an error message or perform any other action
      console.log("Please fill in all fields before updating.");
    } else {
      // setCategoryId(hambozo.categoryId)
      // console.log("hambozo.categoryId",hambozo.categoryId);
      formik.handleSubmit(); // Manually call formik.handleSubmit to update formik.values
      UpdateJob(jobId, formik.values); // Pass formik.values to UpdateJob
    }
  };
  return (
    <div className="container mt-5">
      {!hambozo.jobId && <h2>Create Job</h2>}
      {hambozo.jobId && <h2>Update Job</h2>}
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.title}
            </div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="categoryId" className="form-label">
            select category:
          </label>
          <select
            className="form-select"
            id="categoryId"
            name="categoryId"
            value={formik.values.categoryId}
            onChange={(event) => {
              // Set the selected category value in formik state
              formik.handleChange(event);
              console.log(event.target.value);
              setCategoryId(event.target.value);
            }}
          >
            <option disabled value="">
              Select category
            </option>
            {hambozo.categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
          {/* {!categoryId ? (
            <div className="alert alert-danger p-2 mt-2">select a category</div>
          ) : (
            ""
          )} */}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.description}
            </div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="company" className="form-label">
            Company
          </label>
          <input
            type="text"
            className="form-control"
            id="company"
            name="company"
            value={formik.values.company}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.company && formik.errors.company ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.company}
            </div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.location && formik.errors.location ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.location}
            </div>
          ) : null}
        </div>
        <div className="d-flex justify-content-between">
          <div className="mb-4">
            <label htmlFor="workPlace" className="form-label">
              career level:
            </label>
            <select
              className="form-select"
              id="careerLevel"
              name="careerLevel"
              value={formik.values.careerLevel}
              onChange={formik.handleChange}
            >
              <option disabled value="">
                Select career level
              </option>
              <option value="entry-level">entry level</option>
              <option value="experienced">experienced</option>
              <option value="not-specified">not specified</option>
            </select>
            {workPlaceMessage ? (
              <div className="alert alert-danger p-2 mt-2">
                {workPlaceMessage}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="workPlace" className="form-label">
              work place:
            </label>
            <select
              className="form-select"
              id="workPlace"
              name="workPlace"
              value={formik.values.workPlace}
              onChange={formik.handleChange}
            >
              <option disabled value="">
                Select work place
              </option>
              <option value="on-site">on site</option>
              <option value="hybrid">hybrid</option>
              <option value="remote">remote</option>
            </select>
            {workPlaceMessage ? (
              <div className="alert alert-danger p-2 mt-2">
                {workPlaceMessage}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="jobType" className="form-label">
              job type:
            </label>
            <select
              className="form-select"
              id="jobType"
              name="jobType"
              value={formik.values.jobType}
              onChange={formik.handleChange}
            >
              <option disabled value="">
                Select job type
              </option>
              <option value="full-time">full time</option>
              <option value="part-time">part time</option>
              <option value="work-from-home">work from home</option>
            </select>
            {workPlaceMessage ? (
              <div className="alert alert-danger p-2 mt-2">
                {workPlaceMessage}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="requirements" className="form-label">
            Requirements
          </label>
          <textarea
            type="text"
            className="form-control"
            id="requirements"
            name="requirements"
            value={formik.values.requirements}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.requirements && formik.errors.requirements ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.requirements}
            </div>
          ) : null}
        </div>
        {!hambozo.jobId && (
          <button type="submit" className="btn btn-primary me-2">
            Create Job
          </button>
        )}

        {hambozo.jobId && (
          <button
            type="button"
            onClick={handleUpdateClick}
            className="btn btn-primary me-2"
          >
            Update Application
          </button>
        )}

        <button
          type="button"
          onClick={hambozo.handelCancel}
          className="btn btn btn-outline-secondary"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateJobForm;
