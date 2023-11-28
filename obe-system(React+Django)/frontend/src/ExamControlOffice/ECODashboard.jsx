import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./NavECO";
import Sidebar from "./SidebarECO";
import NA from "./NeedAuthentication";
import "./stylesECODB.css";
import { getToken} from '../services/LocalStorageService'
import { useGetLoggedUserQuery } from '../services/obesApi'

function ECODashboard() {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const [showCourseList, setShowCourseList] = useState(false);
  const {access_token} = getToken();
  const {data, isSuccess} = useGetLoggedUserQuery(access_token)
  const [userData, setUserData] = useState({
     name: '',
     email: '',
     department: '',
     designation: '',
     userType: '',
     id: '',
  })
  
  const [values, setValues] = useState({
    department: '',
    examYear: '',
    year: '',
    semester: ''
  })

  const Toggle = () => {
    setToggle(!toggle);
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

  const handleInput=(event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
  }

  const handleReset = () => {
    setValues({
      department: '',
      examYear: '',
      year: '',
      semester: ''
    });
    (document.querySelector('select[name="department"]')).value = "";
    (document.querySelector('select[name="examYear"]')).value = "";
    (document.querySelector('select[name="year"]')).value = "";
    (document.querySelector('select[name="semester"]')).value = "";
  };

  

  //const navigate = useNavigate();

  const [courseInfo, setCourseInfo] = useState([ ]);

  const ApplySearch=(event) => {
    
  }

  return (
    <div className="container-fluid cntE">
      {!access_token ? 
          <div>
            {navigate('/Login')}
          </div> :
          userData.userType !== '3' ? 
          <div>
            {<NA/>}
          </div>
         :
        <div className="container-fluid bg-secondary min-vh-100">
          {toggle && (
            <div className="cntE row">
              <div className="col-2 bg-white ">
                <Sidebar name={userData.name} dept={userData.department} designation={userData.designation} />
              </div>
              <div className="col-10 vh-100">
                <div className="px-3">
                  <Nav Toggle={Toggle} name={userData.name} />
                  <div className="container-fluid">
                    <div className="row g-3 my-2" id="searchTabECO">
                      {/*<label>{values.department+" "+values.examYear+" "+values.year+" "+values.semester}</label>*/}
                      <div className="dropdown-container row">
                      <div className="col-4"> <label for="department" className="searchTabECOLabel"><strong>Select Department:</strong> </label> </div>
                      <div className="col-8">
                      <select class="form-select drdwE" aria-label="Default select example" name="department" onChange={handleInput}>
                        <option selected value="">None</option>
                        <option value="CSE">CSE</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                      </select>
                      </div>
                      </div>
                      <div class="dropdown-container row">
                      <div className="col-4"> <label for="year" className="searchTabECOLabel"><strong>Select Exam Year: </strong></label> </div>
                      <div className="col-8">
                      <select class="form-select drdwE" aria-label="Default select example" name="examYear" onChange={handleInput}>
                        <option selected value="">None</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                      </select>
                      </div>
                      </div>
                      <div class="dropdown-container row">
                      <div className="col-4"> <label for="examYear" className="searchTabECOLabel"><strong>Select Year and Semester: </strong></label> </div>
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
                    <div className="row g-3 my-2">
                      <div className="col-8">
                        <button
                          className="btn btn-primary btn-outline-light btn-lg lButtonECO"
                          onClick={() => {
                            setShowCourseList(true);
                            ApplySearch();
                          }}>
                          Apply search
                        </button>
                        <button
                          className="btn btn-primary btn-outline-light btn-lg lButtonECO"
                          onClick={() => {
                            setShowCourseList(!showCourseList);
                            ApplySearch();
                          }}>
                          Show the list of Courses
                        </button>
                      </div>
                      <div className="col-4 containerRB">
                        <button className="btn btn-secondary btn-outline-light btn-lg resetButtonECO" onClick={handleReset}> Reset </button>
                      </div>
                    </div>
                    {showCourseList && (
                      <div className="row g-3 my-2">
                        <strong>
                          <span className="fs-3">List of courses:</span>
                        </strong>
                        <div className="courseTableECODB">
                        <table className="table table-responsive-sm table-striped table-bordered bg-white text-center">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Course Title</th>
                              <th scope="col">Course Code</th>
                              <th scope="col">Department</th>
                              <th scope="col">Year</th>
                              <th scope="col">Semester</th>
                              <th scope="col">Exam Year</th>
                              <th scope="col">Course type</th>
                              <th scope="col">Credit</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {courseInfo.slice(0, courseInfo.length).map((course, index) => {
                              return (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{course.courseName}</td>
                                  <td>{course.courseCode}</td>
                                  <td>{course.department}</td>
                                  <td>{course.year}</td>
                                  <td>{course.semester}</td>
                                  <td>{course.examYear}</td>
                                  <td>{course.courseType}</td>
                                  <td>{course.credit}</td>
                                  <td>
                                    <button
                                      className="btn btn-secondary btn-outline-light">
                                      Submit Marks
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>
          )}
          {!toggle && (
            <div className="cntE vh-100">
              <div className="px-3">
                  <Nav Toggle={Toggle} name={userData.name} />
                  <div className="container-fluid">
                    <div className="row g-3 my-2" id="searchTabECO">
                      {/*<label>{values.department+" "+values.examYear+" "+values.year+" "+values.semester}</label>*/}
                      <div className="dropdown-container row">
                      <div className="col-4"> <label for="department" className="searchTabECOLabel"><strong>Select Department:</strong> </label> </div>
                      <div className="col-8">
                      <select class="form-select drdwE" aria-label="Default select example" name="department" onChange={handleInput}>
                        <option selected value="">None</option>
                        <option value="CSE">CSE</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                      </select>
                      </div>
                      </div>
                      <div class="dropdown-container row">
                      <div className="col-4"> <label for="year" className="searchTabECOLabel"><strong>Select Exam Year: </strong></label> </div>
                      <div className="col-8">
                      <select class="form-select drdwE" aria-label="Default select example" name="examYear" onChange={handleInput}>
                        <option selected value="">None</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                      </select>
                      </div>
                      </div>
                      <div class="dropdown-container row">
                      <div className="col-4"> <label for="examYear" className="searchTabECOLabel"><strong>Select Year and Semester: </strong></label> </div>
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
                    <div className="row g-3 my-2">
                      <div className="col-8">
                        <button
                          className="btn btn-primary btn-outline-light btn-lg lButtonECO"
                          onClick={() => {
                            setShowCourseList(true);
                            ApplySearch();
                          }}>
                          Apply search
                        </button>
                        <button
                          className="btn btn-primary btn-outline-light btn-lg lButtonECO"
                          onClick={() => {
                            setShowCourseList(!showCourseList);
                            ApplySearch();
                          }}>
                          Show the list of Courses
                        </button>
                      </div>
                      <div className="col-4 containerRB">
                        <button className="btn btn-secondary btn-outline-light btn-lg resetButtonECO" onClick={handleReset}> Reset </button>
                      </div>
                    </div>
                    {showCourseList && (
                      <div className="row g-3 my-2">
                        <strong>
                          <span className="fs-3">List of courses:</span>
                        </strong>
                        <div className="courseTableECODB">
                        <table className="table table-responsive-sm table-striped table-bordered bg-white text-center">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Course Title</th>
                              <th scope="col">Course Code</th>
                              <th scope="col">Department</th>
                              <th scope="col">Year</th>
                              <th scope="col">Semester</th>
                              <th scope="col">Exam Year</th>
                              <th scope="col">Course type</th>
                              <th scope="col">Credit</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {courseInfo.slice(0, courseInfo.length).map((course, index) => {
                              return (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{course.courseName}</td>
                                  <td>{course.courseCode}</td>
                                  <td>{course.department}</td>
                                  <td>{course.year}</td>
                                  <td>{course.semester}</td>
                                  <td>{course.examYear}</td>
                                  <td>{course.courseType}</td>
                                  <td>{course.credit}</td>
                                  <td>
                                    <button
                                      className="btn btn-secondary btn-outline-light">
                                      Submit Marks
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        </div>
                      </div>)}
                  </div>
                </div>
            </div>
          )}
        </div>
      }
    </div>
  );
}

export default ECODashboard;
