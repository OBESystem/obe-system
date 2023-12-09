import React, { useState, useEffect } from "react";
import Nav from "./NavAdmin";
import { useNavigate } from "react-router-dom";
import Sidebar from "./AdminSidebar";
import NA from "./NeedAuthentication";
import "./stylesUploadAcademicCalendar.css";
import { getToken} from '../services/LocalStorageService'
import { useGetLoggedUserQuery } from '../services/obesApi'

function UploadAcademicCalendar() {
  
  const {access_token} = getToken();
  const navigate = useNavigate();
  const {data, isSuccess} = useGetLoggedUserQuery(access_token)
  const [userData, setUserData] = useState({
     name: '',
     email: '',
     department: '',
     designation: '',
     userType: '',
     id: '',
  })
  const [toggle, setToggle] = useState(true);
  
  const Toggle = () => {
    setToggle(!toggle);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if(data && isSuccess) {
     setUserData({
       name: data.name,
       email: data.email,
       department: data.department,
       designation: data.designation,
       userType: data.userType,
       id: data.id
    })
    }
 }, [data, isSuccess])

  return (
    <div className="cntUAC container-fluid">
      {!access_token ? 
          <div>
            {navigate('/Login')}
          </div> :
          userData.userType !== '2' ? 
          <div>
            {<NA/>}
          </div>
         :
         <div className="container-fluid bg-secondary min-vh-100">
          {toggle && (
            <div className="cntUAC row min-vh-100">
              <div className="col-2 bg-white">
                <Sidebar name={userData.name} dept={userData.department} designation={userData.designation} />
              </div>
              <div className="col-10">
                <div className="px-3">
                  <Nav Toggle={Toggle} name={userData.name} />
                  <div className="container-fluid" id="courseFile">
                    <div className="row g-3 my-2">
                      <div className="col-md-12 p-1">
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content-around rounded">
                          <div className="col-md-12 courseInfo">
                            <p className="fs-2">
                              <strong>Department</strong>: <span>{userData.department}</span>
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
                  <Nav Toggle={Toggle} name={userData.name} />
                  <div className="container-fluid" id="courseFile">
                    <div className="row g-3 my-2">
                      <div className="col-md-12 p-1">
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content-around rounded">
                          <div className="col-md-12 courseInfo">
                            <p className="fs-2">
                              <strong>Department</strong>: <span>{userData.department}</span>
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
      }
      
    </div>
  );
}

export default UploadAcademicCalendar;
