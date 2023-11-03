import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./NavAdmin";
import Sidebar from "./AdminSidebar";
import NA from "./NeedAuthentication";
import "./stylesAssignCourse.css";

function AssignCourse() {
  const [toggle, setToggle] = useState(true);
  const [showCourseList, setShowCourseList] = useState(false);
  const [auth, setAuth] = useState(true);
  const [name, setName] = useState("Dr. Md. Golam Moazzam");
  const [id, setId] = useState("");
  const [dept, setDept] = useState("CSE");

  const [values, setValues] = useState({
    department: "",
    year: "",
    exam: "",
  });
  const Toggle = () => {
    setToggle(!toggle);
  };

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const navigate = useNavigate();

  const [info, setInfo] = useState([
    {
      courseName: "Data Structure",
      courseCode: "CSE-152",
      year: "1st",
      semester: "2nd",
      examYear: "2022",
      courseType: "Theory",
      credit: "3",
    },
    {
      courseName: "Numerical Method Laboratory",
      courseCode: "CSE-207",
      year: "2nd",
      semester: "1st",
      examYear: "2023",
      courseType: "Lab",
      credit: "1",
    },
  ]);

  return (
    <div className="container-fluid cnt">
      {auth ? (
        <div className="container-fluid bg-secondary min-vh-100">
          {toggle && (
            <div className="cnt row">
              <div className="col-2 bg-white ">
                <Sidebar name={name} dept={dept} />
              </div>
              <div className="col-10 vh-100">
                <div className="px-3">
                  <Nav Toggle={Toggle} name={name} />
                  <div className="container-fluid">
                    <div className="row g-3 my-2">
                      

                      <div class="dropdown-container">
                        <label for="year">
                          <strong>Select Year: </strong>
                        </label>
                        <select
                          class="form-select small-dropdown"
                          aria-label="Default select example"
                          name="year"
                          onChange={handleInput}
                        >
                          <option selected>None</option>
                          <option value="2022">2022</option>
                          <option value="2023">2023</option>
                          <option value="2024">2024</option>
                        </select>
                      </div>

                      <div class="dropdown-container">
                        <label for="examYear">
                          <strong>Select Exam Year and Exam Semester: </strong>
                        </label>
                        <select
                          class="form-select small-dropdown1"
                          aria-label="Default select example"
                          id="examYear"
                          name="examYear"
                          onChange={handleInput}
                        >
                          <option selected>None</option>
                          <option value="1">1st year</option>
                          <option value="2">2nd Year</option>
                          <option value="3">3rd Year</option>
                          <option value="4">4th Year</option>
                        </select>

                        {/* <label for="examSemester"><strong>Select Exam Semester: </strong></label> */}
                        <select
                          class="form-select small-dropdown1"
                          aria-label="Default select example"
                          name="examSemester"
                          onChange={handleInput}
                        >
                          <option selected>None</option>
                          <option value="1">1st Semester</option>
                          <option value="2">2nd Semester</option>
                        </select>
                      </div>
                    </div>
                    <div className="row g-3 my-2">
                      <button
                        className="btn btn-primary btn-outline-light btn-lg lButton"
                        onClick={() => {
                          setShowCourseList(!showCourseList);
                          //GetInfo();
                        }}
                      >
                        Show the list of Courses
                      </button>
                    </div>
                    {showCourseList && (
                      <div className="row g-3 my-2">
                        <strong>
                          <span className="fs-3">List of courses:</span>
                        </strong>
                        <table className="table table-responsive-sm table-striped table-bordered bg-white text-center">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Course Title</th>
                              <th scope="col">Course Code</th>
                              <th scope="col">Year</th>
                              <th scope="col">Semester</th>
                              <th scope="col">Exam Year</th>
                              <th scope="col">Course type</th>
                              <th scope="col">Credit</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {info.slice(0, info.length).map((course, index) => {
                              return (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{course.courseName}</td>
                                  <td>{course.courseCode}</td>
                                  <td>{course.year}</td>
                                  <td>{course.semester}</td>
                                  <td>{course.examYear}</td>
                                  <td>{course.courseType}</td>
                                  <td>{course.credit}</td>
                                  <td>
                                    <button className="btn btn-secondary btn-outline-light">
                                      Enter Marks
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {!toggle && (
            <div className="cnt vh-100">
              <div className="px-3">
                <Nav Toggle={Toggle} name={name} />
                <div className="container-fluid">
                  <div className="row g-3 my-2">
                    <div class="dropdown-container">
                      <label for="department">
                        <strong>Select Department: </strong>
                      </label>
                      <select
                        class="form-select small-dropdown"
                        aria-label="Default select example"
                        name="department"
                        onChange={handleInput}
                      >
                        <option selected>None</option>
                        <option value="CSE">CSE</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                      </select>
                    </div>

                    <div class="dropdown-container">
                      <label for="year">
                        <strong>Select Year: </strong>
                      </label>
                      <select
                        class="form-select small-dropdown"
                        aria-label="Default select example"
                        name="year"
                        onChange={handleInput}
                      >
                        <option selected>None</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                      </select>
                    </div>

                    <div class="dropdown-container">
                      <label for="examYear">
                        <strong>Select Exam Year and Exam Semester: </strong>
                      </label>
                      <select
                        class="form-select small-dropdown1"
                        aria-label="Default select example"
                        id="examYear"
                        name="examYear"
                        onChange={handleInput}
                      >
                        <option selected>None</option>
                        <option value="1">1st year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </select>

                      {/* <label for="examSemester"><strong>Select Exam Semester: </strong></label> */}
                      <select
                        class="form-select small-dropdown1"
                        aria-label="Default select example"
                        name="examSemester"
                        onChange={handleInput}
                      >
                        <option selected>None</option>
                        <option value="1">1st Semester</option>
                        <option value="2">2nd Semester</option>
                      </select>
                    </div>
                  </div>
                  <div className="row g-3 my-2">
                    <button
                      className="btn btn-primary btn-outline-light btn-lg lButton"
                      onClick={() => {
                        setShowCourseList(!showCourseList);
                        //GetInfo();
                      }}
                    >
                      Show the list of Courses
                    </button>
                  </div>
                  {showCourseList && (
                    <div className="row g-3 my-2">
                      <strong>
                        <span className="fs-3">List of courses:</span>
                      </strong>
                      <table className="table table-responsive-sm table-striped table-bordered bg-white text-center">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Course Title</th>
                            <th scope="col">Course Code</th>
                            <th scope="col">Year</th>
                            <th scope="col">Semester</th>
                            <th scope="col">Exam Year</th>
                            <th scope="col">Course type</th>
                            <th scope="col">Credit</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {info.slice(0, info.length).map((course, index) => {
                            return (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{course.courseName}</td>
                                <td>{course.courseCode}</td>
                                <td>{course.year}</td>
                                <td>{course.semester}</td>
                                <td>{course.examYear}</td>
                                <td>{course.courseType}</td>
                                <td>{course.credit}</td>
                                <td>
                                  <button className="btn btn-secondary btn-outline-light">
                                    Enter Marks
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <NA />
        </div>
      )}
    </div>
  );
}

export default AssignCourse;
