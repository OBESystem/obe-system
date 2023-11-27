import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./NavAdmin";
import Sidebar from "./AdminSidebar";
import NA from "./NeedAuthentication";
import "./stylesUploadAcademicCalendar.css";

function UploadAcademicCalendar() {
  // const location = useLocation();
  // const data = location.state ? location.state.courseData : null;

  const [toggle, setToggle] = useState(true);
  const [auth, setAuth] = useState(true);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [dept, setDept] = useState("");
  const [designation, setDesignation] = useState("");
  const Toggle = () => {
    setToggle(!toggle);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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

  return (
    <div className="cntUAC container-fluid">
      {auth ? (
        <div className="container-fluid bg-secondary min-vh-100">
          {toggle && (
            <div className="cntUAC row min-vh-100">
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
                          </div>
                        </div>
                        <div
                          className="row p-3 bg-white shadow-sm d-flex justify-content-around part rounded"
                          id="assignment"
                        >
                          <p>
                            <label className="fs-2">
                              <strong>Upload Academic Calendar</strong>
                            </label>
                          </p>
                          <div>
                            <div className="card card-body">
                              <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                  <input
                                    className="form-control"
                                    name="complianceFormAssignment"
                                    type="file"
                                    id="assignmentCp"
                                    required
                                  />
                                </div>
                                <button
                                  type="reset"
                                  className="btn btn-secondary"
                                >
                                  Reset
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-success btnSubmit"
                                >
                                  Submit
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div
                          className="row p-3 bg-white shadow-sm d-flex justify-content around part rounded"
                          id="classTest"
                        >
                          <p>
                            <label className="fs-2">
                              <strong>Academic Calendar</strong>
                            </label>
                          </p>
                          
                            
                          <div id="viewAC">
                          <div className='container fluid'>
                              <div className="ifrme">
                                <iframe
                                  src="../Academic Calendar.pdf#zoom=100"
                                  width="900px"
                                  height="100%"
                                  title="PDF Viewer"
                                ></iframe>
                              </div>
                            </div>
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
            <div className="cntUAC min-vh-100">
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
                          </div>
                        </div>
                        <div
                          className="row p-3 bg-white shadow-sm d-flex justify-content-around part rounded"
                          id="assignment"
                        >
                          <p>
                            <label className="fs-2">
                              <strong>Upload Academic Calendar</strong>
                            </label>
                          </p>
                          <div>
                            <div className="card card-body">
                              <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                  <input
                                    className="form-control"
                                    name="complianceFormAssignment"
                                    type="file"
                                    id="assignmentCp"
                                    required
                                  />
                                </div>
                                <button
                                  type="reset"
                                  className="btn btn-secondary"
                                >
                                  Reset
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-success btnSubmit"
                                >
                                  Submit
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div
                          className="row p-3 bg-white shadow-sm d-flex justify-content around part rounded"
                          id="classTest"
                        >
                          <p>
                            <label className="fs-2">
                              <strong>Academic Calendar</strong>
                            </label>
                          </p>
                          <div id="viewAC1">
                          <div className='container fluid'>
                              <div className="ifrme">
                                <iframe
                                  src="../Academic Calendar.pdf#zoom=100"
                                  width="900px"
                                  height="100%"
                                  title="PDF Viewer"
                                ></iframe>
                              </div>
                            </div>
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

export default UploadAcademicCalendar;
