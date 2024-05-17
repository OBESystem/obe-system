import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './NavAdmin';
import AdminSidebar from './AdminSidebar';
import NA from './NeedAuthentication';
import './stylesAdminDashboard.css';
import { getToken} from '../services/LocalStorageService'
import { useGetLoggedUserQuery, useGetCourseListMutation, useGetTeacherMutation} from '../services/obesApi'

function AdminDashboard() {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  // const [showCourseList, setShowCourseList] = useState(false);
  const [showCourseList, setShowCourseList] = useState(false);
  const {access_token} = getToken();
  const {data, isSuccess} = useGetLoggedUserQuery(access_token)
  const [getCourseList] =  useGetCourseListMutation()
  const [getTeacher] = useGetTeacherMutation()
  const [userData, setUserData] = useState({
     name: '',
     email: '',
     department: '',
     designation: '',
     userType: '',
     id: '',
     profile_picture:'',
  })
  const [teacherData, setTeacherData] = useState({
    id: '',
    no_of_assigned_course: '',
    no_of_due_course_file_submission: '',
  })
  
  const Toggle = () => {
    setToggle(!toggle)
  }

  const GetTeacher= async(event) => {
    const res = await getTeacher({user_id : data.id});
    setTeacherData(res.data);
    //console.log(res.data)
  }
  useEffect(() => {
    if(data && isSuccess) {
     setUserData({
        name: data.name,
        email: data.email,
        department: data.department,
        designation: data.designation,
        userType: data.userType,
        id: data.id,
        profile_picture: 'http://127.0.0.1:8000/'+data.profile_picture,
      })
      GetTeacher();
    }
 }, [data, isSuccess])

  const [info, setInfo] = useState([]);
  const GetInfo = async(event) => {
    const res = await getCourseList({teacher_id : teacherData.id});
    setInfo(res.data);
  }

  const EnterCF = (index) => {
    navigate('/Enter-Course-File-2', { state: { courseData: info[index] } });
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
                <AdminSidebar name={userData.name} dept={userData.department} designation={userData.designation} profile_picture= {userData.profile_picture}/>
              </div>
              <div className="col-10 vh-100">
                <div className="px-3">
                  <Nav Toggle={Toggle} name={userData.name} />
                  <div className="container-fluid">
                    <div className="row g-3 my-2">
                      <div className="col-md-3 p-1 box">
                        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                          <div>
                            <h3 className="fs-2">{teacherData.no_of_assigned_course}</h3>
                            <p className="fs-5">Active courses</p>
                          </div>
                          <i className="bi bi-card-list p-3 fs-1"></i>
                        </div>
                      </div>
                      <div className="col-md-3 p-1 box">
                        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                          <div>
                            <h3 className="fs-2">{teacherData.no_of_due_course_file_submission}</h3>
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
                          GetInfo();
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
                        {info.slice(0, info.length).map((course,index) => {
                        return (
                          <tr>
                              <td>{index+1}</td>
                              <td>{course.course_name}</td>
                              <td>{course.course_code}</td>
                              <td>{course.year}</td>
                              <td>{course.semester}</td>
                              <td>{course.exam_year}</td>
                              <td>{course.course_type}</td>
                              <td>{course.credit}</td>
                              <td>
                                {(course.is_course_file_submitted === false) && <button className="btn btn-outline-primary" onClick={() => EnterCF(index)}>Go to Course File</button>}
                                {(course.is_course_file_submitted === true) && <button className="btn btn-outline-primary disabled">Go to Course File</button>}
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
                            <h3 className="fs-2">{teacherData.no_of_assigned_course}</h3>
                            <p className="fs-5">Active courses</p>
                          </div>
                          <i className="bi bi-card-list p-3 fs-1"></i>
                        </div>
                      </div>
                      <div className="col-md-3 p-1 box">
                        <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                          <div>
                            <h3 className="fs-2">{teacherData.no_of_due_course_file_submission}</h3>
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
                          GetInfo();
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
                        {info.slice(0, info.length).map((course,index) => {
                        return (
                          <tr>
                              <td>{index+1}</td>
                              <td>{course.course_name}</td>
                              <td>{course.course_code}</td>
                              <td>{course.year}</td>
                              <td>{course.semester}</td>
                              <td>{course.exam_year}</td>
                              <td>{course.course_type}</td>
                              <td>{course.credit}</td>
                              <td>
                                {(course.is_course_file_submitted === false) && <button className="btn btn-outline-primary" onClick={() => EnterCF(index)}>Go to Course File</button>}
                                {(course.is_course_file_submitted === true) && <button className="btn btn-outline-primary disabled">Go to Course File</button>}
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
