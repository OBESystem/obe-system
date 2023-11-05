import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./NavAdmin";
import Sidebar from "./AdminSidebar";
import NA from "./NeedAuthentication";
import "./stylesAssignCourse.css";

function AssignCourse() {
  const [toggle, setToggle] = useState(true);
  const [auth, setAuth] = useState(true);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [dept, setDept] = useState("");
  const [designation, setDesignation] = useState("");
  const [showCourseList, setShowCourseList] = useState(false);
  const [showTeacherList, setShowTeacherList] = useState(false);
  const Toggle = () => {
    setToggle(!toggle);
  };

  const [values, setValues] = useState({
    courseNo: "",
    teacherID: ""
  });

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

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

  const [courseInfo, setCourseInfo] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState([]);
  const GetCourseInfo=(event) => {
    axios.get('http://localhost:7000/CourseInfoForAssigningCourse', { params: { department: dept } })
    .then(res =>{
      setCourseInfo(res.data);
      //console.log(res.data);
    })
    .catch(err => console.log(err));
  }

  const GetTeacherInfo=(event) => {
    axios.get('http://localhost:7000/GetApprovedTeacherList', { params: { department: dept } })
    .then(res =>{
      setTeacherInfo(res.data);
      //console.log(res.data);
    })
    .catch(err => console.log(err));
  }

  const AssignTeacher=(event) => {
    axios.post('http://localhost:7000/AssignTeacherToCourse', { courseCode: courseInfo[values.courseNo-1].courseCode, examYear: courseInfo[values.courseNo-1].examYear, t_id: values.teacherID})
    .then(res =>{
      alert("Selected teacher is assigned to the course..");
    })
    .catch(err => console.log(err));
    //console.log(values.courseNo+"   "+values.teacherID);
    axios.post('http://localhost:7000/UpdateTeacherInfoForCourse', { t_id: values.teacherID})
    .then(res =>{
      //console.log("Selected teacher is assigned to the course..");
    })
    .catch(err => console.log(err));
  }


  return (
    <div className="container-fluid cntAssignCourse">
      {auth ? (
        <div className="container-fluid bg-secondary min-vh-100">
          {toggle && (
            <div className="cntAssignCourse row">
              <div className="col-2 bg-white ">
                <Sidebar name={name} dept={dept} designation={designation}/>
              </div>
              <div className="col-10 min-vh-100">
                <div className="px-3">
                  <Nav Toggle={Toggle} name={name} />
                  <div className="container-fluid">
                    <div className="row g-3 my-2">
                      <div className="card card-body">
                        <p className="fs-2 courseInfo">
                            <span>Assign/Update Course Teacher</span><br/>
                            <strong>Department</strong>: <span>{dept}</span>
                        </p>
                      </div>
                    </div>
                    <div className="row g-3 my-2" id="assignTeacherSection">
                      <div className="col-3 assignTeacherSectionDiv">
                        <label htmlFor="courseNo">Course number(from the table):</label>
                        <input type="text" id="courseNo" name="courseNo" onChange={handleInput}/>
                      </div>
                      <div className="col-3 assignTeacherSectionDiv">
                        <label htmlFor="teacherID">Teacher ID:</label>
                        <input type="text" id="teacherID" name="teacherID" onChange={handleInput}/>
                      </div>
                      <div className="col-5 assignTBtn"> 
                        <button className="btn btn-primary btn-outline-light btn-lg lButton"
                        onClick={() => {
                          setShowTeacherList(false);
                          setShowCourseList(false);
                          AssignTeacher();
                        }}>
                          Assign Teacher
                        </button>
                      </div>
                    </div>
                    <div className="row g-3 my-2">
                      <button
                        className="btn btn-primary btn-outline-light btn-lg lButton"
                        onClick={() => {
                          setShowCourseList(!showCourseList);
                          GetCourseInfo();
                        }}>
                        Show the list of Courses
                      </button>
                      <button
                        className="btn btn-primary btn-outline-light btn-lg lButton"
                        onClick={() => {
                          setShowTeacherList(!showTeacherList);
                          GetTeacherInfo();
                        }}>
                        Show the list of Teachers
                      </button>
                    </div>
                    {showCourseList && (
                      <div className="row g-3 my-2">
                        <strong>
                          <span className="fs-3">List of Unassigned Courses:</span>
                        </strong>
                        <div className="CourseTableAssignCourse">
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
                            {courseInfo.slice(0, courseInfo.length).map((course, index) => {
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
                    )}
                    {showTeacherList && (
                      <div className="row g-3 my-2">
                        <strong>
                          <span className="fs-3">List of teachers:</span>
                        </strong>
                        <div className="TeacherTableAssignCourse">
                          <table className="table table-responsive-sm table-striped table-bordered bg-white text-center">
                            <thead>
                              <tr>
                                <th scope="col">Teacher ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Designation</th>
                                <th scope="col">Email</th>
                                <th scope="col">Number of Assigned Courses</th>
                              </tr>
                            </thead>
                            <tbody>
                              {teacherInfo.slice(0, teacherInfo.length).map((teacher, index) => {
                                return (
                                  <tr>
                                    <td>{teacher.t_id}</td>
                                    <td>{teacher.name}</td>
                                    <td>{teacher.designation}</td>
                                    <td>{teacher.email}</td>
                                    <td>{teacher.noOfAssignedCourses}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {!toggle && (
            <div className="cntAssignCourse min-vh-100">
              <div className="px-3">
                  <Nav Toggle={Toggle} name={name} />
                  <div className="container-fluid">
                    <div className="row g-3 my-2">
                      <div className="card card-body">
                        <p className="fs-2 courseInfo">
                            <span>Assign Courses to Teachers</span><br/>
                            <strong>Department</strong>: <span>{dept}</span>
                        </p>
                      </div>
                    </div>
                    <div className="row g-3 my-2" id="assignTeacherSection">
                      <div className="col-3 assignTeacherSectionDiv">
                        <label htmlFor="courseNo">Course number(from the table):</label>
                        <input type="text" id="courseNo" name="courseNo" onChange={handleInput}/>
                      </div>
                      <div className="col-3 assignTeacherSectionDiv">
                        <label htmlFor="teacherID">Teacher ID:</label>
                        <input type="text" id="teacherID" name="teacherID" onChange={handleInput}/>
                      </div>
                      <div className="col-5 assignTBtn"> 
                        <button className="btn btn-primary btn-outline-light btn-lg lButton"
                        onClick={() => {
                          setShowTeacherList(false);
                          setShowCourseList(false);
                          AssignTeacher();
                        }}>
                          Assign Teacher
                        </button>
                      </div>
                    </div>
                    <div className="row g-3 my-2">
                      <button
                        className="btn btn-primary btn-outline-light btn-lg lButton"
                        onClick={() => {
                          setShowCourseList(!showCourseList);
                          GetCourseInfo();
                        }}>
                        Show the list of Courses
                      </button>
                      <button
                        className="btn btn-primary btn-outline-light btn-lg lButton"
                        onClick={() => {
                          setShowTeacherList(!showTeacherList);
                          GetTeacherInfo();
                        }}>
                        Show the list of Teachers
                      </button>
                    </div>
                    {showCourseList && (
                      <div className="row g-3 my-2">
                        <strong>
                          <span className="fs-3">List of Unassigned Courses:</span>
                        </strong>
                        <div className="CourseTableAssignCourse">
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
                            {courseInfo.slice(0, courseInfo.length).map((course, index) => {
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
                    )}
                    {showTeacherList && (
                      <div className="row g-3 my-2">
                        <strong>
                          <span className="fs-3">List of teachers:</span>
                        </strong>
                        <div className="TeacherTableAssignCourse">
                          <table className="table table-responsive-sm table-striped table-bordered bg-white text-center">
                            <thead>
                              <tr>
                                <th scope="col">Teacher ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Designation</th>
                                <th scope="col">Email</th>
                                <th scope="col">Number of Assigned Courses</th>
                              </tr>
                            </thead>
                            <tbody>
                              {teacherInfo.slice(0, teacherInfo.length).map((teacher, index) => {
                                return (
                                  <tr>
                                    <td>{teacher.t_id}</td>
                                    <td>{teacher.name}</td>
                                    <td>{teacher.designation}</td>
                                    <td>{teacher.email}</td>
                                    <td>{teacher.noOfAssignedCourses}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
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
