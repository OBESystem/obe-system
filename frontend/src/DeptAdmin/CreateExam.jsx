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
    const [showTeacherList, setShowTeacherList] = useState(false);
    const Toggle = () => {
      setToggle(!toggle);
    };

    const [values, setValues] = useState({
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

    const [teacherInfo, setTeacherInfo] = useState([]);
    
  
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
                                    <span className="fs-1">Create Exam</span><br/>
                                    <strong>Department</strong>: <span>{dept}</span>
                                </p>
                            </div>
                        </div>
                        <div className="row g-3 my-2" id="searchTabCreateExam">
                            {/*<label>{values.department+" "+values.examYear+" "+values.year+" "+values.semester}</label>*/}
                            <div class="dropdown-container row">
                            <div className="col-4"> <label for="year" className="searchTabCreateELabel"><strong>Select Exam Year: </strong></label> </div>
                            <div className="col-8">
                            <select class="form-select drdwE" aria-label="Default select example" name="examYear" onChange={handleInput}>
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
                            <select class="form-select drdwE" aria-label="Default select example" id="examYear" name="year" onChange={handleInput}>
                                <option selected value="">None</option>
                                <option value="1st">1st year</option>
                                <option value="2nd">2nd Year</option>
                                <option value="3rd">3rd Year</option>
                                <option value="4th">4th Year</option>
                            </select>
                            </div>
                            <div className="col-4">
                            <select class="form-select drdwE" aria-label="Default select example" name="semester" onChange={handleInput}>
                                <option selected value="">None</option>
                                <option value="1st">1st Semester</option>
                                <option value="2nd">2nd Semester</option>
                            </select>
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
                            <div className="col-2">
                              <button className="btn btn-primary btn-lg btnCreateExams">Assign Teacher</button>
                            </div>
                            <div className="col-8"> </div>
                            <div className="col-2 btnRight">
                              <button className="btn btn-primary btn-lg btnCreateExams">Add Course</button>
                            </div>
                            </div>
                        </div>
                        <div className="row g-3 my-2">
                          <button className="btn btn-primary btn-lg btnCreateExams btnCreateExams2">Show the list of assigned course</button>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
  
            {!toggle && (
              <div className="cntAppTe min-vh-100.">
                
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