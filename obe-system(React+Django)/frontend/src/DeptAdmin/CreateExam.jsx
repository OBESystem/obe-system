import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "./NavAdmin";
import Sidebar from "./AdminSidebar";
import NA from "./NeedAuthentication";
import "./stylesCreateExam.css";

function CreateExam() {
    const [toggle, setToggle] = useState(true);
    const [auth, setAuth] = useState(false);
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");
    const [dept, setDept] = useState("");
    const [designation, setDesignation] = useState("");
    const Toggle = () => {
      setToggle(!toggle);
    };
    
    const [tempValues, setTempValues] = useState({
      examYear: '',
      year: '',
      semester: ''
    })

    const [values, setValues] = useState({
        t_id: '0',
        examYear: '',
        year: '',
        semester: '',
        courseName: '',
        courseCode: '',
        courseType: '',
        credit: ''
    })
    
    const handleInput=(event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
    }

    const handleTempInput=(event) => {
      setTempValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
    }
  
    useEffect(() => {
      const storedAuth = localStorage.getItem("auth");
      if (storedAuth === "true") {
        setAuth(true);
        axios.get("http://localhost:7000/AdminDashboard").then((res) => {
          if (res.data.Status === "Success") {
            setAuth(true);
            localStorage.setItem("auth", "true");
            setName(res.data.name);
            setUserId(res.data.user_id);
            setDept(res.data.dept);
            setDesignation(res.data.designation);
          }
        });
      } else {
        axios.get("http://localhost:7000/AdminDashboard").then((res) => {
          if (res.data.Status === "Success") {
            setAuth(true);
            localStorage.setItem("auth", "true");
            setName(res.data.name);
            setUserId(res.data.user_id);
            setDept(res.data.dept);
            setDesignation(res.data.designation);
            console.log(name);
          } else {
            setAuth(false);
          }
        });
      }
    }, []);

    const [addedCourseInfo, setAddedCourseInfo] = useState([]);
    const AddCourse = () => {
      if(
        values.examYear !== '' &&
        values.year !== '' &&
        values.semester !== '' &&
        values.courseName !=='' &&
        values.courseCode !== '' &&
        values.courseType !== '' &&
        values.credit !== ''
      )
      {
        setAddedCourseInfo([...addedCourseInfo, values]);
        alert("The course is added successfully..");
      }
      else
      {
        alert("Enter the required informations first!!");
      }
    };

    const updatePropertyInCourseInfo = (propertyToChange, newValue) => {
      setAddedCourseInfo((prevCourseInfo) => {
        return prevCourseInfo.map((course) => ({
          ...course, 
          [propertyToChange]: newValue,
        }));
      });
    };

    const CreateExam = () => {
      if(addedCourseInfo.length !== 0 && tempValues.year !== '' && tempValues.semester !== '' && tempValues.examYear !== '')
      {
        updatePropertyInCourseInfo('year', tempValues.year);
        updatePropertyInCourseInfo('semester', tempValues.semester);
        updatePropertyInCourseInfo('examYear', tempValues.examYear);
      }
      setValues((prevValues) => ({
        ...prevValues, 
        year: tempValues.year, 
        semester: tempValues.semester, 
        examYear: tempValues.examYear
      }));
      if(addedCourseInfo.length > 0)
      {
        alert("Examination information is edited..");
      }
      else
      {
        alert("Examination is created..");
      }
    };
    
    const SubmitCourses = () => {
      if(addedCourseInfo.length > 0)
      {
        addedCourseInfo.forEach((c) => {
          axios
            .post("http://localhost:7000/AddCourseDA", {department: dept, t_id:c.t_id,courseName: c.courseName, courseCode: c.courseCode, courseType: c.courseType, 
               year:c.year, semester:c.semester, examYear:c.examYear,credit: c.credit})
            .then((res) => {
              //console.log("success");
            })
            .catch((err) => console.log(err));
        });
        alert("Courses are added succesfully..");
      }
      else
      {
        alert("No course is added yet!!");
      }
    };

    const navigate = useNavigate();
    const AssignCourseTeacher = () => {
      if(addedCourseInfo.length > 0)
      {
        navigate('/CreateExamAndAssignCourse', {state: { yourArray: addedCourseInfo }});
      }
      else
      {
        alert("No course is added yet!!");
      }
    }
    
  
    return (
      <div className="cntCreateExam container-fluid">
        {auth ? (
          <div className="container-fluid bg-secondary min-vh-100">
            {toggle && (
              <div className="cntCreateExam row min-vh-100">
                <div className="col-2 bg-white">
                  <Sidebar name={name} dept={dept} designation={designation} />
                </div>
                <div className="col-10">
                  <div className="px-3">
                    <Nav Toggle={Toggle} name={name} />
                    <div className="container-fluid">
                        <div className="row g-3 my-2">
                            <div className="card card-body">
                                <p className="fs-2 courseInfo">
                                    <span className="fs-1">Manage Exam</span><br/>
                                    <strong>Department</strong>: <span>{dept}</span>
                                </p>
                            </div>
                        </div>
                        <div className="row g-3 my-2" id="searchTabCreateExam">
                            {/*<label>{values.department+" "+values.examYear+" "+values.year+" "+values.semester}</label>*/}
                            <div class="dropdown-container row">
                            <div className="col-4"> <label for="year" className="searchTabCreateELabel"><strong>Select Exam Year: </strong></label> </div>
                            <div className="col-8">
                            <select class="form-select drdwE" aria-label="Default select example" name="examYear" onChange={handleTempInput}>
                                <option selected value="">None</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                            </select>
                            </div>
                            </div>
                            <div class="dropdown-container row">
                            <div className="col-4"> <label for="examYear" className="searchTabCreateELabel"><strong>Select Year and Semester: </strong></label> </div>
                            <div className="col-4">
                            <select class="form-select drdwE" aria-label="Default select example" id="examYear" name="year" onChange={handleTempInput}>
                                <option selected value="">None</option>
                                <option value="1st">1st year</option>
                                <option value="2nd">2nd Year</option>
                                <option value="3rd">3rd Year</option>
                                <option value="4th">4th Year</option>
                            </select>
                            </div>
                            <div className="col-4">
                            <select class="form-select drdwE" aria-label="Default select example" name="semester" onChange={handleTempInput}>
                                <option selected value="">None</option>
                                <option value="1st">1st Semester</option>
                                <option value="2nd">2nd Semester</option>
                            </select>
                            </div>
                            </div>
                            <div class="dropdown-container row">
                            <div className="col-10"> </div>
                            <div className="col-2 btnRight">
                              <button className="btn btn-primary btn-lg btnCreateExams"
                              onClick={() => {
                                CreateExam();
                              }}>Create/Edit Exam</button>
                            </div>
                            </div>
                        </div>
                        <div className="row g-3 my-2" id="searchTabCreateExam">
                            <div class="dropdown-container row">
                            <div className="col-4"> <label for="courseName" className="searchTabCreateELabel"><strong>Enter course name: </strong></label> </div>
                            <div className="col-8">
                              <input className="form-control inputForCreatingExam" type="text" id="courseName" name="courseName" onChange={handleInput}/>
                            </div>
                            </div>
                            <div class="dropdown-container row">
                            <div className="col-4"> <label for="courseCode" className="searchTabCreateELabel"><strong>Enter course code: </strong></label> </div>
                            <div className="col-8">
                              <input className="form-control inputForCreatingExam" type="text" id="courseCode" name="courseCode" onChange={handleInput}/>
                            </div>
                            </div>
                            <div class="dropdown-container row">
                            <div className="col-4"> <label for="courseType" className="searchTabCreateELabel"><strong>Enter course type: </strong></label> </div>
                            <div className="col-8">
                              <input className="form-control inputForCreatingExam" type="text" id="courseType" name="courseType" onChange={handleInput}/>
                            </div>
                            </div>
                            <div class="dropdown-container row">
                            <div className="col-4"> <label for="credit" className="searchTabCreateELabel"><strong>Enter course credit: </strong></label> </div>
                            <div className="col-8">
                              <input className="form-control inputForCreatingExam" type="text" id="credit" name="credit" onChange={handleInput}/>
                            </div>
                            </div>
                            <div class="dropdown-container row">
                            <div className="col-10"> </div>
                            <div className="col-2 btnRight">
                              <button className="btn btn-primary btn-lg btnCreateExams"
                              onClick={() => {
                                AddCourse();
                              }}>Add Course</button>
                            </div>
                            </div>
                        </div>
                        <div className="row g-3 my-2">
                          <strong>
                            <span className="fs-3">List of Added Courses:</span>
                          </strong>
                          <div className="CourseTableAddedCourse">
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
                              </tr>
                            </thead>
                            <tbody>
                              {addedCourseInfo.slice(0, addedCourseInfo.length).map((course, index) => {
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
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                          </div>
                      </div>
                      <div class="dropdown-container row">
                        <div className="col-2">
                          <button className="btn btn-primary btn-lg btnCreateExams"
                          onClick={() => {
                            AssignCourseTeacher();
                          }}>Assign Teacher</button>
                        </div>
                        <div className="col-8"> </div>
                        <div className="col-2 btnRight">
                          <button className="btn btn-primary btn-lg btnCreateExams"
                          onClick={() => {
                            SubmitCourses();
                          }}>Submit course list</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
  
            {!toggle && (
              <div className="cntCreateExam min-vh-100.">
                <div className="px-3">
                    <Nav Toggle={Toggle} name={name} />
                    <div className="container-fluid">
                        <div className="row g-3 my-2">
                            <div className="card card-body">
                                <p className="fs-2 courseInfo">
                                    <span className="fs-1">Manage Exam</span><br/>
                                    <strong>Department</strong>: <span>{dept}</span>
                                </p>
                            </div>
                        </div>
                        <div className="row g-3 my-2" id="searchTabCreateExam">
                            {/*<label>{values.department+" "+values.examYear+" "+values.year+" "+values.semester}</label>*/}
                            <div class="dropdown-container row">
                            <div className="col-4"> <label for="year" className="searchTabCreateELabel"><strong>Select Exam Year: </strong></label> </div>
                            <div className="col-8">
                            <select class="form-select drdwE" aria-label="Default select example" name="examYear" onChange={handleTempInput}>
                                <option selected value="">None</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                            </select>
                            </div>
                            </div>
                            <div class="dropdown-container row">
                            <div className="col-4"> <label for="examYear" className="searchTabCreateELabel"><strong>Select Year and Semester: </strong></label> </div>
                            <div className="col-4">
                            <select class="form-select drdwE" aria-label="Default select example" id="examYear" name="year" onChange={handleTempInput}>
                                <option selected value="">None</option>
                                <option value="1st">1st year</option>
                                <option value="2nd">2nd Year</option>
                                <option value="3rd">3rd Year</option>
                                <option value="4th">4th Year</option>
                            </select>
                            </div>
                            <div className="col-4">
                            <select class="form-select drdwE" aria-label="Default select example" name="semester" onChange={handleTempInput}>
                                <option selected value="">None</option>
                                <option value="1st">1st Semester</option>
                                <option value="2nd">2nd Semester</option>
                            </select>
                            </div>
                            </div>
                            <div class="dropdown-container row">
                            <div className="col-10"> </div>
                            <div className="col-2 btnRight">
                              <button className="btn btn-primary btn-lg btnCreateExams"
                              onClick={() => {
                                CreateExam();
                              }}>Create/Edit Exam</button>
                            </div>
                            </div>
                        </div>
                        <div className="row g-3 my-2" id="searchTabCreateExam">
                            <div class="dropdown-container row">
                            <div className="col-4"> <label for="courseName" className="searchTabCreateELabel"><strong>Enter course name: </strong></label> </div>
                            <div className="col-8">
                              <input className="form-control inputForCreatingExam" type="text" id="courseName" name="courseName" onChange={handleInput}/>
                            </div>
                            </div>
                            <div class="dropdown-container row">
                            <div className="col-4"> <label for="courseCode" className="searchTabCreateELabel"><strong>Enter course code: </strong></label> </div>
                            <div className="col-8">
                              <input className="form-control inputForCreatingExam" type="text" id="courseCode" name="courseCode" onChange={handleInput}/>
                            </div>
                            </div>
                            <div class="dropdown-container row">
                            <div className="col-4"> <label for="courseType" className="searchTabCreateELabel"><strong>Enter course type: </strong></label> </div>
                            <div className="col-8">
                              <input className="form-control inputForCreatingExam" type="text" id="courseType" name="courseType" onChange={handleInput}/>
                            </div>
                            </div>
                            <div class="dropdown-container row">
                            <div className="col-4"> <label for="credit" className="searchTabCreateELabel"><strong>Enter course credit: </strong></label> </div>
                            <div className="col-8">
                              <input className="form-control inputForCreatingExam" type="text" id="credit" name="credit" onChange={handleInput}/>
                            </div>
                            </div>
                            <div class="dropdown-container row">
                            <div className="col-10"> </div>
                            <div className="col-2 btnRight">
                              <button className="btn btn-primary btn-lg btnCreateExams"
                              onClick={() => {
                                AddCourse();
                              }}>Add Course</button>
                            </div>
                            </div>
                        </div>
                        <div className="row g-3 my-2">
                          <strong>
                            <span className="fs-3">List of Added Courses:</span>
                          </strong>
                          <div className="CourseTableAddedCourse">
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
                              </tr>
                            </thead>
                            <tbody>
                              {addedCourseInfo.slice(0, addedCourseInfo.length).map((course, index) => {
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
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                          </div>
                      </div>
                      <div class="dropdown-container row">
                        <div className="col-2">
                          <button className="btn btn-primary btn-lg btnCreateExams"
                          onClick={() => {
                            AssignCourseTeacher();
                          }}>Assign Teacher</button>
                        </div>
                        <div className="col-8"> </div>
                        <div className="col-2 btnRight">
                          <button className="btn btn-primary btn-lg btnCreateExams"
                          onClick={() => {
                            SubmitCourses();
                          }}>Submit course list</button>
                        </div>
                      </div>
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

export default CreateExam