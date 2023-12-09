import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './NavAdmin';
import AdminSidebar from './AdminSidebar';
import NA from './NeedAuthentication';
import './stylesAdminDashboard.css';
import { getToken} from '../services/LocalStorageService'
import { useGetLoggedUserQuery } from '../services/obesApi'

function AdminDashboard() {
  const [toggle, setToggle] = useState(true);
  // const [showCourseList, setShowCourseList] = useState(false);
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
  
  const Toggle = () => {
    setToggle(!toggle)
  }

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


  const navigate = useNavigate();


  const [info, setInfo] = useState([]);
  const GetInfo = (event) => {
    
  }

  const EnterCF = (index) => {
    navigate('/Enter-Course-File', { state: { courseData: info[index] } });
  }


  return (
    <div className="container-fluid cntAdminDashboard">
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
          {toggle &&
            <div className="cntAdminDashboard row">
              <div className="col-2 bg-white ">
                <AdminSidebar name={userData.name} dept={userData.department} designation={userData.designation} />
              </div>
              <div className="col-10 vh-100">
                <div className="px-3">
                  <Nav Toggle={Toggle} name={userData.name} />
                  <div className="container-fluid">
                    <div className="row g-3 my-2">
                      <div className="col-md-3 p-1 box">
                        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                          <div>
                            <h3 className="fs-2">2</h3>
                            <p className="fs-5">Active courses</p>
                          </div>
                          <i className="bi bi-card-list p-3 fs-1"></i>
                        </div>
                      </div>
                      <div className="col-md-3 p-1 box">
                        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                          <div>
                            <h3 className="fs-2">1</h3>
                            <p className="fs-5">Due Course File Submissions</p>
                          </div>
                          <i className="bi bi-clock p-3 fs-1"></i>
                        </div>
                      </div>
                    </div>
                    <div className="row g-3 my-2">
                      <button className="btn btn-primary btn-outline-light btn-lg lButton"
                        onClick={() => {
                          setShowCourseList(!showCourseList);
                          //GetInfo();
                        }}>Show the list of Courses</button>
                    </div>
                    {showCourseList && (<div className="row g-3 my-2">
                      <strong><span className="fs-3">List of courses:</span></strong>
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
                                  {(course.isCourseFileSubmitted === '0') && <button className="btn btn-outline-primary" onClick={() => EnterCF(index)}>Go to Course File</button>}
                                  {(course.isCourseFileSubmitted === '1') && <button className="btn btn-outline-primary disabled">Go to Course File</button>}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>)}
                  </div>
                </div>
              </div>
            </div>}
          {!toggle &&
            <div className="cntAdminDashboard vh-100">
              <div className="px-3">
                  <Nav Toggle={Toggle} name={userData.name} />
                  <div className="container-fluid">
                    <div className="row g-3 my-2">
                      <div className="col-md-3 p-1 box">
                        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                          <div>
                            <h3 className="fs-2">2</h3>
                            <p className="fs-5">Due Course File Submissions</p>
                          </div>
                          <i className="bi bi-card-list p-3 fs-1"></i>
                        </div>
                      </div>
                      <div className="col-md-3 p-1 box">
                        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                          <div>
                            <h3 className="fs-2">3</h3>
                            <p className="fs-5">Due Marks Submissions</p>
                          </div>
                          <i className="bi bi-clock p-3 fs-1"></i>
                        </div>
                      </div>
                    </div>
                    <div className="row g-3 my-2">
                      <button className="btn btn-primary btn-outline-light btn-lg lButton"
                        onClick={() => {
                          setShowCourseList(!showCourseList);
                          //GetInfo();
                        }}>Show the list of Courses</button>
                    </div>
                    {showCourseList && (<div className="row g-3 my-2">
                      <strong><span className="fs-3">List of courses:</span></strong>
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
                                  {(course.isCourseFileSubmitted === '0') && <button className="btn btn-outline-primary" onClick={() => EnterCF(index)}>Go to Course File</button>}
                                  {(course.isCourseFileSubmitted === '1') && <button className="btn btn-outline-primary disabled">Go to Course File</button>}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>)}
                 </div>
               </div>
           </div>
         }
       </div>
      }
    </div>
  )
}

export default AdminDashboard;
