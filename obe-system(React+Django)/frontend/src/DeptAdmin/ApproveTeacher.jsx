import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "./NavAdmin";
import Sidebar from "./AdminSidebar";
import NA from "./NeedAuthentication";
import "./stylesApproveTeacher.css";

function ApproveTeacher() {
  //   const location = useLocation();
  //   const data = location.state ? location.state.courseData : null;

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

  const GetTeacherInfo = (event) => {
    axios
      .get("http://localhost:7000/TeacherInfo", { params: { dept: dept } })
      .then((res) => {
        setTeacherInfo(res.data);
        //console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const AddTeacher = (index) => {
    axios.post("http://localhost:7000/AddTeacher", { user_id: teacherInfo[index].user_id })
    .then((res) => {
        //console.log(teacherInfo[index]);
    })
    .catch((err) => console.log(err));
  };

  const ApproveUser = (index) => {
    axios
      .post("http://localhost:7000/ApproveUser", { user_id: teacherInfo[index].user_id })
      .then((res) => {
        alert("Teacher is approved..")
        //console.log(teacherInfo[index]);
      })
      .catch((err) => console.log(err));
  };

  const RemoveTeacher = (index) => {
    axios.post("http://localhost:7000/RemoveTeacher", { user_id: teacherInfo[index].user_id })
    .then((res) => {
        alert("Authentication is dispproved..");
        //console.log(res.data);
    })
    .catch((err) => console.log(err));
  };
  const navigate = useNavigate();
  //Reloading removes the user data

  return (
    <div className="cntAppTe container-fluid">
      {auth ? (
        <div className="container-fluid bg-secondary min-vh-100">
          {toggle && (
            <div className="cntAppTe row min-vh-100">
              <div className="col-2 bg-white">
                <Sidebar name={name} dept={dept} designation={designation} />
              </div>
              <div className="col-10">
                <div className="px-3">
                  <Nav Toggle={Toggle} name={name} />
                  <div className="container-fluid" id="courseFile">
                    <div className="row g-3 my-2">
                      <div className="col-md-12 p-1">
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content-around rounded">
                          <div className="col-md-12 courseInfo">
                            <p className="fs-2">
                              <strong>Department</strong>: <span>{dept}</span>
                            </p>
                            <p className="fs-3">
                              <strong>Approve Pending Teacher Account</strong>
                            </p>
                          </div>
                        </div>
                        <div
                          className="row p-3 bg-white shadow-sm d-flex justify-content-around part rounded"
                          id="assignment"
                        >
                          <p>
                            <button
                              className="btn btn-primary btn-outline-light lButton"
                              onClick={() => {
                                setShowTeacherList(!showTeacherList);
                                GetTeacherInfo();
                              }}
                            >
                              Show Pending Teacher Accounts
                            </button>
                          </p>
                          <div>
                            {showTeacherList && (
                              <div className="row g-3 my-2">
                                <strong>
                                  <span className="fs-3">List of courses:</span>
                                </strong>
                                <div className="teacherTableForApproval">
                                  <table className="table table-responsive-sm table-striped table-bordered bg-white text-center">
                                    <thead>
                                      <tr>
                                        <th scope="col">User ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Designation</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">PhoneNumber</th>
                                        <th scope="col">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {teacherInfo
                                        .slice(0, teacherInfo.length)
                                        .map((teacher, index) => {
                                          return (
                                            <tr>
                                              <td>{teacher.user_id}</td>
                                              <td>{teacher.name}</td>
                                              <td>{teacher.designation}</td>
                                              <td>{teacher.email}</td>
                                              <td>{teacher.phoneNumber}</td>
                                              <td>
                                              <button className="btn btn-success"
                                              onClick={() => {
                                                AddTeacher(index);
                                                setShowTeacherList(!showTeacherList);
                                                ApproveUser(index);
                                              }}
                                              >Approve</button>&nbsp;
                                              <button className="btn btn-danger"
                                              onClick={() => {
                                                RemoveTeacher(index);
                                                setShowTeacherList(!showTeacherList);
                                              }}
                                              >Reject</button>
                                            </td>
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
                    <div className="row g-3 my-2"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!toggle && (
            <div className="cntAppTe min-vh-100.">
              <div className="px-3">
                  <Nav Toggle={Toggle} name={name} />
                  <div className="container-fluid" id="courseFile">
                    <div className="row g-3 my-2">
                      <div className="col-md-12 p-1">
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content-around rounded">
                          <div className="col-md-12 courseInfo">
                            <p className="fs-2">
                              <strong>Department</strong>: <span>{dept}</span>
                            </p>
                            <p className="fs-3">
                              <strong>Approve Pending Teacher Account</strong>
                            </p>
                          </div>
                        </div>
                        <div
                          className="row p-3 bg-white shadow-sm d-flex justify-content-around part rounded"
                          id="assignment"
                        >
                          <p>
                            <button
                              className="btn btn-primary btn-outline-light lButton"
                              onClick={() => {
                                setShowTeacherList(!showTeacherList);
                                GetTeacherInfo();
                              }}
                            >
                              Show Pending Teacher Accounts
                            </button>
                          </p>
                          <div>
                            {showTeacherList && (
                              <div className="row g-3 my-2">
                                <strong>
                                  <span className="fs-3">List of courses:</span>
                                </strong>
                                <div className="teacherTableForApproval">
                                  <table className="table table-responsive-sm table-striped table-bordered bg-white text-center">
                                    <thead>
                                      <tr>
                                        <th scope="col">User ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Designation</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">PhoneNumber</th>
                                        <th scope="col">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {teacherInfo
                                        .slice(0, teacherInfo.length)
                                        .map((teacher, index) => {
                                          return (
                                            <tr>
                                              <td>{teacher.user_id}</td>
                                              <td>{teacher.name}</td>
                                              <td>{teacher.designation}</td>
                                              <td>{teacher.email}</td>
                                              <td>{teacher.phoneNumber}</td>
                                              <td>
                                              <button className="btn btn-success"
                                              onClick={() => {
                                                AddTeacher(index);
                                                setShowTeacherList(!showTeacherList);
                                                ApproveUser(index);
                                              }}
                                              >Approve</button>&nbsp;
                                              <button className="btn btn-danger"
                                              onClick={() => {
                                                RemoveTeacher(index);
                                                setShowTeacherList(!showTeacherList);
                                              }}
                                              >Reject</button>
                                            </td>
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
                    <div className="row g-3 my-2"></div>
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

export default ApproveTeacher;
