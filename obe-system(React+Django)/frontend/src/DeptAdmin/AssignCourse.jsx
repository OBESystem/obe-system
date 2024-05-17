import React, { useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import Nav from "./NavAdmin";
import Sidebar from "./AdminSidebar";
import NA from "./NeedAuthentication";
import "./stylesAssignCourse.css";
import { getToken} from '../services/LocalStorageService'
import { useGetLoggedUserQuery, useGetCourseListByDeptMutation, useGetTeacherListByDeptMutation, useGetUserByIDMutation, useUpdateTeacherForCA_addMutation, useAssignTeacherMutation, 
        useUpdateTeacherForCA_removeMutation} from '../services/obesApi'

function AssignCourse() {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const {access_token} = getToken();
  const [showCourseList, setShowCourseList] = useState(false);
  const [showTeacherList, setShowTeacherList] = useState(false);
  const {data, isSuccess} = useGetLoggedUserQuery(access_token);
  const [getCourseListByDept] = useGetCourseListByDeptMutation()
  const [getTeacherListByDept] =useGetTeacherListByDeptMutation()
  const [getUserByID] = useGetUserByIDMutation()
  const [updateTeacherForCA_add] = useUpdateTeacherForCA_addMutation()
  const [updateTeacherForCA_remove] = useUpdateTeacherForCA_removeMutation()
  const [assignTeacher] = useAssignTeacherMutation()
  const [userData, setUserData] = useState({
     name: '',
     email: '',
     department: '',
     designation: '',
     userType: '',
     id: '',
     profile_picture:''
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
       id: data.id,
       profile_picture: 'http://127.0.0.1:8000/'+data.profile_picture,
    })
    }
  }, [data, isSuccess])

  const [values, setValues] = useState({
    courseNo: [''],
    teacher_id: ['']
  });

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  
  const [courseInfo, setCourseInfo] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const GetCourseInfo=async(event) => {
    const res = await getCourseListByDept({department : userData.department});
    setCourseInfo(res.data);
  }
  const addUserInfo= async(array) => {
    for (const teacher of array) {
      const res = await getUserByID({id : teacher.user});
      setUserInfo(prevUserInfo => [...prevUserInfo, res.data]);
    }
  }
  const GetTeacherInfo= async() => {
    const res = await  getTeacherListByDept({department : userData.department});
    await addUserInfo(res.data);
    setTeacherInfo(res.data);
    //console.log(userInfo);
  }

  const AssignTeacher=async(event) => {
    //console.log(values.courseNo[0]+ ' ' + values.teacher_id[0]);
    if(values.courseNo[0] === 'None' || values.courseNo[0]==='' || values.teacher_id[0] === 'None' || values.teacher_id[0]==='')
    {
      alert("Invalid information!!");
    }
    else if(courseInfo[values.courseNo[0]-1].teacher_id == values.teacher_id[0])
    {
      alert("Selected teacher is already assigned!!");
    }
    else if(courseInfo[values.courseNo[0]-1].is_course_file_submitted === true)
    {
      alert("Course file is already submitted!! This course can't be assigned to another teacher..");
    }
    else
    {
      const actualData1 = {
        id : values.teacher_id[0]
      }
      const res1 = await updateTeacherForCA_add(actualData1);

      const actualData2 = {
        id : courseInfo[values.courseNo[0]-1].id,
        teacher_id : values.teacher_id[0]
      }
      const res2 = await assignTeacher(actualData2);

      if(courseInfo[values.courseNo[0]-1].teacher_id !== 0)
      {
        const actualData3 = {
          id : courseInfo[values.courseNo[0]-1].teacher_id
        }
        const res3 = await updateTeacherForCA_remove(actualData3);

        if(!res1.error && !res2.error && !res3.error)
        {
          alert("Course teacher of the selected course is changed. Selected teacher is assigned to that course..");
        }
      }
      else
      {
        if(!res1.error && !res2.error)
        {
          alert("Selected teacher is assigned to the selected course..");
        }
      }
    }
  }

  return (
    <div className="container-fluid cntAssignCourse">
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
            <div className="cntAssignCourse row">
              <div className="col-2 bg-white ">
                <Sidebar name={userData.name} dept={userData.department} designation={userData.designation} profile_picture= {userData.profile_picture}/>
              </div>
              <div className="col-10 min-vh-100">
                <div className="px-3">
                  <Nav Toggle={Toggle} name={userData.name} />
                  <div className="container-fluid">
                    <div className="row g-3 my-2">
                      <div className="card card-body">
                        <p className="fs-2 courseInfo">
                            <span>Assign/Update Course Teacher</span><br/>
                            <strong>Department</strong>: <span>{userData.department}</span>
                        </p>
                      </div>
                    </div>
                    <div className="row g-3 my-2" id="assignTeacherSection">
                      <div className="col-3 assignTeacherSectionDiv">
                        <label htmlFor="courseNo">Course number(from the table):</label>
                        <select className="form-select assignTeacherSelectInput" aria-label="Default select example" name="courseNo" id="courseNo" onChange={handleInput}>
                            <option selected defaultValue="">None</option>
                            {courseInfo.slice(0, courseInfo.length).map((course, index) => {
                              return (
                                <option value={index + 1}>{index+1}</option>
                              );
                            })}
                        </select>
                      </div>
                      <div className="col-3 assignTeacherSectionDiv">
                        <label htmlFor="teacher_id">Teacher ID:</label>
                        <select className="form-select assignTeacherSelectInput" aria-label="Default select example" name="teacher_id" id="teacher_id" onChange={handleInput}>
                            <option selected defaultValue="">None</option>
                            {teacherInfo.slice(0, teacherInfo.length).map((teacher) => {
                              return (
                                <option value={teacher.id}>{teacher.id}</option>
                              );
                            })}
                        </select>
                      </div>
                      <div className="col-5 assignTBtn"> 
                        <button className="btn btn-primary btn-outline-light btn-lg lButton"
                        onClick={() => {
                          setShowTeacherList(false);
                          setShowCourseList(false);
                          AssignTeacher();
                        }}>Assign Teacher</button>
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
                          <span className="fs-3">List of Courses:</span>
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
                              <th scope="col">Assigned Teacher ID</th>
                            </tr>
                          </thead>
                          <tbody>
                            {courseInfo.slice(0, courseInfo.length).map((course, index) => {
                              return (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{course.course_name}</td>
                                  <td>{course.course_code}</td>
                                  <td>{course.year}</td>
                                  <td>{course.semester}</td>
                                  <td>{course.exam_year}</td>
                                  <td>{course.course_type}</td>
                                  <td>{course.credit}</td>
                                  <td>{course.teacher_id}</td>
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
                                    <td>{teacher.id}</td>
                                    <td>{userInfo[index].name}</td>
                                    <td>{userInfo[index].designation}</td>
                                    <td>{userInfo[index].email}</td>
                                    <td>{teacher.no_of_assigned_course}</td>
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
                  <Nav Toggle={Toggle} name={userData.name} />
                  <div className="container-fluid">
                    <div className="row g-3 my-2">
                      <div className="card card-body">
                        <p className="fs-2 courseInfo">
                            <span>Assign/Update Course Teacher</span><br/>
                            <strong>Department</strong>: <span>{userData.department}</span>
                        </p>
                      </div>
                    </div>
                    <div className="row g-3 my-2" id="assignTeacherSection">
                      <div className="col-3 assignTeacherSectionDiv">
                        <label htmlFor="courseNo">Course number(from the table):</label>
                        <select className="form-select assignTeacherSelectInput" aria-label="Default select example" name="courseNo" id="courseNo" onChange={handleInput}>
                            <option selected defaultValue="">None</option>
                            {courseInfo.slice(0, courseInfo.length).map((course, index) => {
                              return (
                                <option value={index + 1}>{index+1}</option>
                              );
                            })}
                        </select>
                      </div>
                      <div className="col-3 assignTeacherSectionDiv">
                        <label htmlFor="teacher_id">Teacher ID:</label>
                        <select className="form-select assignTeacherSelectInput" aria-label="Default select example" name="teacher_id" id="teacher_id" onChange={handleInput}>
                            <option selected defaultValue="">None</option>
                            {teacherInfo.slice(0, teacherInfo.length).map((teacher) => {
                              return (
                                <option value={teacher.id}>{teacher.id}</option>
                              );
                            })}
                        </select>
                      </div>
                      <div className="col-5 assignTBtn"> 
                        <button className="btn btn-primary btn-outline-light btn-lg lButton"
                        onClick={() => {
                          setShowTeacherList(false);
                          setShowCourseList(false);
                          AssignTeacher();
                        }}>Assign Teacher</button>
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
                          <span className="fs-3">List of Courses:</span>
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
                              <th scope="col">Assigned Teacher ID</th>
                            </tr>
                          </thead>
                          <tbody>
                            {courseInfo.slice(0, courseInfo.length).map((course, index) => {
                              return (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{course.course_name}</td>
                                  <td>{course.course_code}</td>
                                  <td>{course.year}</td>
                                  <td>{course.semester}</td>
                                  <td>{course.exam_year}</td>
                                  <td>{course.course_type}</td>
                                  <td>{course.credit}</td>
                                  <td>{course.teacher_id}</td>
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
                                    <td>{teacher.id}</td>
                                    <td>{userInfo[index].name}</td>
                                    <td>{userInfo[index].designation}</td>
                                    <td>{userInfo[index].email}</td>
                                    <td>{teacher.no_of_assigned_course}</td>
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
      }
    </div>
  );
}

export default AssignCourse;
