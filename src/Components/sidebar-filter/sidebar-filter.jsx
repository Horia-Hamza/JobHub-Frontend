import { useEffect, useState } from "react";

export const SidebarFilter = ({ onFilterChange }) => {
//   const [selectedWorkPlace, setSelectedWorkPlace] = useState([]);
const [selectedFilters, setSelectedFilters] = useState({
  jobType: [],
  careerLevel: [],
  workPlace: []
});
//  const [filters, setFilters] = useState([
//   {title: "workPlace", search:[]},  
//   {title: "careerLevel", search:[]},
//   // {title: "workPlace", search:[]},
//   // {title: "workPlace", search:[]},
//   // {title: "workPlace", search:[]},
//   // {title: "workPlace", search:[]},
//  ]);
 const handleCheckboxChange = (event) => {
   const { name, value, checked } = event.target;

   setSelectedFilters(prevFilters => {
    const updatedFilters = { ...prevFilters };

    if (checked) {
      updatedFilters[name] = [...updatedFilters[name], value];
    } else {
      updatedFilters[name] = updatedFilters[name].filter(item => item !== value);
    }

    return updatedFilters;
  });
  };
 useEffect(() => {
   onFilterChange(selectedFilters);
 }, [selectedFilters, onFilterChange]);

  useEffect(() => {
    console.log("child", selectedFilters);
  }, [selectedFilters]);
  return (
    <>
      <section>
        <div className="p-3">
          <div>
            <div className="border-bottom">
              <h6 className="fw-bolder">Filters</h6>
              {/* <p>1 filters selected</p> */}
            </div>
            <div className="mt-3 pb-2 border-bottom">
              <h6
                className="fw-bolder"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample1"
                aria-controls="collapseExample"
              >
                Workplace
              </h6>
              <div className="collapse" id="collapseExample1">
                <div className=" card-body">
                  <div className="form-check">
                    <input
                      onChange={handleCheckboxChange}
                      className="form-check-input"
                      type="checkbox"
                      name="workPlace"
                      value="on-site"
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      On-site
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      onChange={handleCheckboxChange}
                      className="form-check-input"
                      type="checkbox"
                      name="workPlace"
                      value="hybrid"
                      id="flexCheckChecked"
                    />
                    <label className="form-check-label" for="flexCheckChecked">
                      Hybrid
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      onChange={handleCheckboxChange}
                      className="form-check-input"
                      type="checkbox"
                      name="workPlace"
                      value="remote"
                      id="flexCheckChecked2"
                    />
                    <label className="form-check-label" for="flexCheckChecked2">
                      Remotely
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* Workplace end*/}
            {/* <div className="mt-3 pb-2 border-bottom">
              <h6
                className="fw-bolder"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample2"
                aria-controls="collapseExample"
              >
                Location
              </h6>
              <div className="collapse" id="collapseExample2">
                <div className=" card-body">
                  <div className="form-check">
                    <input
                     onChange={handleCheckboxChange}
                      className="form-check-input"
                      type="checkbox"
                      name="Location"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      On-site
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      onChange={handleCheckboxChange}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked"
                    />
                    <label className="form-check-label" for="flexCheckChecked">
                      Hybrid
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                     onChange={handleCheckboxChange}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked2"
                    />
                    <label className="form-check-label" for="flexCheckChecked2">
                      Remotely
                    </label>
                  </div>
                </div>
              </div>
            </div> */}
      {/* Location end */}
            <div className="mt-3 pb-2 border-bottom">
              <h6
                className="fw-bolder"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample3"
                aria-controls="collapseExample"
              >
                Career Level
              </h6>
              <div className="collapse" id="collapseExample3">
                <div className=" card-body">
                  {/* <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="careerLevel"
                      value="all"
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      All
                    </label>
                  </div> */}
                  <div className="form-check">
                    <input
                     onChange={handleCheckboxChange}
                      className="form-check-input"
                      type="checkbox"
                      name="careerLevel"
                     value="entry-level"
                      id="flexCheckChecked"
                    />
                    <label className="form-check-label" for="flexCheckChecked">
                      Entry Level
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                     onChange={handleCheckboxChange}
                      className="form-check-input"
                      type="checkbox"
                      name="careerLevel"
                      value="experienced"
                      id="flexCheckChecked2"
                    />
                    <label className="form-check-label" for="flexCheckChecked2">
                      Experienced
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      onChange={handleCheckboxChange}
                      className="form-check-input"
                      type="checkbox"
                      name="careerLevel"
                      value="not-specified"
                      id="flexCheckChecked3"
                    />
                    <label className="form-check-label" for="flexCheckChecked2">
                      Not Specified
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* career level ends */}
            {/* <div className="mt-3 pb-2 border-bottom">
              <h6
                className="fw-bolder"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample4"
                aria-controls="collapseExample"
              >
                Years of experience
              </h6>
              <div className="collapse" id="collapseExample4">
                <div className=" card-body">
                  <div className="mb-3 d-flex">
                    <input
                      onChange={handleCheckboxChange}
                      type="text"
                      className="form-control w-50 me-3"
                      id="exampleFormControlInput1"
                      placeholder="Min"
                    />
                    <input
                     onChange={handleCheckboxChange}
                      type="text"
                      className="form-control w-50"
                      id="exampleFormControlInput2"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="mt-3 pb-2 border-bottom">
              <h6
                className="fw-bolder"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample5"
                aria-controls="collapseExample"
              >
                Job Category
              </h6>
              <div className="collapse" id="collapseExample5">
                <div className=" card-body">
                  <div className="form-check">
                    <input
                     onChange={handleCheckboxChange}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      On-site
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                     onChange={handleCheckboxChange}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked"
                    />
                    <label className="form-check-label" for="flexCheckChecked">
                      Hybrid
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                     onChange={handleCheckboxChange}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked2"
                    />
                    <label className="form-check-label" for="flexCheckChecked2">
                      Remotely
                    </label>
                  </div>
                </div>
              </div>
            </div> */}
            {/* Job Category end */}
            <div className="mt-3 pb-2">
              <h6
                className="fw-bolder"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample6"
                aria-controls="collapseExample"
              >
                Job Type
              </h6>
              <div className="collapse" id="collapseExample6">
                <div className=" card-body">
                  {/* <div className="form-check">
                    <input
                      className="form-check-input"
                      name="jobType"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      All
                    </label>
                  </div> */}
                  <div className="form-check">
                    <input
                     onChange={handleCheckboxChange}
                      className="form-check-input"
                      type="checkbox"
                      name="jobType"
                      value="full-time"
                      id="flexCheckChecked"
                    />
                    <label className="form-check-label" for="flexCheckChecked">
                      Full time
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                     onChange={handleCheckboxChange}
                      className="form-check-input"
                      type="checkbox"
                      name="jobType"
                      value="work-from-home"
                      id="flexCheckChecked2"
                    />
                    <label className="form-check-label" for="flexCheckChecked2">
                      Work from home
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                     onChange={handleCheckboxChange}
                      className="form-check-input"
                      type="checkbox"
                      name="jobType"
                      value="part-time"
                      id="flexCheckChecked2"
                    />
                    <label className="form-check-label" for="flexCheckChecked2">
                      Part time
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="mt-3">
              <h6
                className="fw-bolder"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample7"
                aria-controls="collapseExample"
              >
                Date Posted
              </h6>
              <div className="collapse" id="collapseExample7">
                <div className=" card-body">
                  <div className="form-check">
                    <input
                     onChange={handleCheckboxChange}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      All
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                     onChange={handleCheckboxChange}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked"
                    />
                    <label className="form-check-label" for="flexCheckChecked">
                      Past 24 hours
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                     onChange={handleCheckboxChange}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked2"
                    />
                    <label className="form-check-label" for="flexCheckChecked2">
                      Past week
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                     onChange={handleCheckboxChange}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked2"
                    />
                    <label className="form-check-label" for="flexCheckChecked2">
                      Past month
                    </label>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};
