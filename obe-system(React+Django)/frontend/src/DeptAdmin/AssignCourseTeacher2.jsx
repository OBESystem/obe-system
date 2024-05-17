import React, { useState, useEffect } from "react";
import { useLocation, useNavigate} from 'react-router-dom';
import Nav from "./NavAdmin";
import Sidebar from "./AdminSidebar";
import NA from "./NeedAuthentication";
import "./stylesAssignCourse.css";
import { getToken} from '../services/LocalStorageService'
import { useGetLoggedUserQuery, useAddCourseMutation, useGetTeacherListByDeptMutation, useGetUserByIDMutation, 
  useUpdateTeacherForCA_addMutation, useUpdateTeacherForCA_removeMutation} from '../services/obesApi'

function AssignCourseTeacher2() {
  const location = useLocation();
  const navigate = useNavigate();
  const yourArray = location.state && location.state.yourArray;
  const [toggle, setToggle] = useState(true);
  const {access_token} = getToken();
  const [showCourseList, setShowCourseList] = useState(false);
  const [showTeacherList, setShowTeacherList] = useState(false);
  const [courseInfo, setCourseInfo] = useState(yourArray);
  const [savedCourseInfo] = useState(yourArray);
  const {data, isSuccess} = useGetLoggedUserQuery(access_token);
  const [addCourse] = useAddCourseMutation()
  const [getTeacherListByDept] =useGetTeacherListByDeptMutation()
  const [getUserByID] = useGetUserByIDMutation()
  const [updateTeacherForCA_add] = useUpdateTeacherForCA_addMutation()
  const [updateTeacherForCA_remove] = useUpdateTeacherForCA_removeMutation()
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

  const handleCourseList = () => {
    if(showCourseList === false)
    {
      setShowCourseList(true)
    }
  }

  const handleTeacherList = () => {
    if(showTeacherList === false)
    {
      GetTeacherInfo()
      setShowTeacherList(true)
    }
  }

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };
  
  const [userInfo, setUserInfo] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState([]);

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

  const UpdateTeacherInfo = async() => {
    if(courseInfo[(values.courseNo-1)].teacher_id != 0)
    {
      teacherInfo.slice(0, teacherInfo.length).map((teacher, index) => {
        if(teacher.id == courseInfo[(values.courseNo-1)].teacher_id)
        {
          setTeacherInfo((prevTeacherInfo) => {
            const updatedTeacherInfo = [...prevTeacherInfo];
            const updatedObject = { ...updatedTeacherInfo[index] };
            updatedObject['no_of_assigned_course'] = updatedObject.no_of_assigned_course -1 ; 
            updatedTeacherInfo[index] = updatedObject;
            return updatedTeacherInfo;
          });
        }
      })
    }
    teacherInfo.slice(0, teacherInfo.length).map((teacher, index) => {
      if(teacher.id == values.teacher_id[0])
      {
        setTeacherInfo((prevTeacherInfo) => {
          const updatedTeacherInfo = [...prevTeacherInfo];
          const updatedObject = { ...updatedTeacherInfo[index] };
          updatedObject['no_of_assigned_course'] = updatedObject.no_of_assigned_course +1 ; 
          updatedTeacherInfo[index] = updatedObject;
          return updatedTeacherInfo;
        });
      }
    })
  };

  const UpdateInfoForCourseAssignment = async() => {
    if(courseInfo[(values.courseNo-1)].is_course_file_submitted === false)
    {
      await UpdateTeacherInfo()
      setCourseInfo((prevCourseInfo) => {
        const propertyToChange = 'teacher_id';
        const updatedCourseInfo = [...prevCourseInfo];
        const updatedObject = { ...updatedCourseInfo[(values.courseNo-1)] };
        updatedObject[propertyToChange] = values.teacher_id; 
        updatedCourseInfo[(values.courseNo-1)] = updatedObject;
        return updatedCourseInfo;
      });
    }
    else
    {
      alert('Course file of the course is already submitted. Course teacher can not be changed now!!')
    }
  };

  const SubmitCourses2 = async() => {
    var error = 0;
    for (const course of savedCourseInfo) {
      if(course.id !== 0 && course.teacher_id != '0' && course.is_course_file_submitted === false)
      {
        const actualData3 = {
          id : course.teacher_id
        }
        const res3 = await updateTeacherForCA_remove(actualData3);
        if(res3.error)
        {
          error++;
        }
      }
    }
    
    for (const courseData of courseInfo) {
      var actualData= {}
      var teacher_id = 0;
      if(courseData.teacher_id[0])teacher_id = courseData.teacher_id[0]
      else teacher_id = courseData.teacher_id
      if(courseData.id === 0)
      {
        actualData = {
          c_id: courseData.id,
          department: userData.department,
          teacher_id: teacher_id,
          exam_year: courseData.exam_year[0],
          year: courseData.year[0],
          semester: courseData.semester[0],
          course_name: courseData.course_name[0],
          course_code: courseData.course_code[0],
          course_type: courseData.course_type[0],
          credit: courseData.credit[0]
        }
      }
      else
      {
        actualData = {
          c_id: courseData.id,
          department: userData.department,
          teacher_id: teacher_id,
          exam_year: courseData.exam_year,
          year: courseData.year,
          semester: courseData.semester,
          course_name: courseData.course_name,
          course_code: courseData.course_code,
          course_type: courseData.course_type,
          credit: courseData.credit
        }
      }
      //console.log(actualData)
      const res1 = await addCourse(actualData);
      if(!res1.error && actualData.teacher_id != '0' && courseData.is_course_file_submitted === false)
      {
        const actualData1 = {
          id : actualData.teacher_id
        }
        const res2 = await updateTeacherForCA_add(actualData1);
        if(res2.error)
        {
          error++;
        }
      }
      else
      {
        if(res1.error)
        {
          error++;
        }
      }
    }
    if(error === 0)
    {
      alert('Examination informartion is submitted successfully..')
      navigate('/CreateExam');
    }
    else
    {
      alert('Some error has occured!!')
    }
  };

    return (
      <div className="container-fluid cntAssignCourse2">
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
              <div className="cntAssignCourse2 row">
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
                              <span>Assign Course Teacher</span><br/>
                              <strong>Exam</strong>: <span>{yourArray[0].year} year {yourArray[0].semester} semester, {yourArray[0].exam_year}</span><br/>
                              <strong>Department</strong>: <span>{userData.department}</span>
                          </p>
                        </div>
                      </div>
                      <div className="row g-3 my-2" id="assignTeacherSection">
                        <div className="col-3 assignTeacherSectionDiv2">
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
                        <div className="col-3 assignTeacherSectionDiv2">
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
                            UpdateInfoForCourseAssignment();
                          }}>
                            Assign Teacher
                          </button>
                        </div>
                      </div>
                      <div className="row g-3 my-2">
                        <button
                          className="btn btn-primary btn-outline-light btn-lg lButton"
                          onClick={() => {
                            handleCourseList();
                          }}>
                          Show the list of Courses
                        </button>
                        <button
                          className="btn btn-primary btn-outline-light btn-lg lButton"
                          onClick={() => {
                            handleTeacherList();
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
                                <th scope="col">Assigned teacher ID</th>
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
                                    <td>{course.teacher_id}</td>
                                    <td>{course.course_name}</td>
                                    <td>{course.course_code}</td>
                                    <td>{course.year}</td>
                                    <td>{course.semester}</td>
                                    <td>{course.exam_year}</td>
                                    <td>{course.course_type}</td>
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
                      {showCourseList && (
                      <div class="dropdown-container row">
                        <div className="col-10"> </div>
                        <div className="col-2 btnRight">
                          <button className="btn btn-primary btn-lg btnCreateExams"
                          onClick={() => {
                            SubmitCourses2();
                          }}>Submit course list</button>
                        </div>
                      </div>)}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!toggle && (
              <div className="cntAssignCourse2 min-vh-100">
               <div className="px-3">
                    <Nav Toggle={Toggle} name={userData.name} />
                    <div className="container-fluid">
                      <div className="row g-3 my-2">
                        <div className="card card-body">
                          <p className="fs-2 courseInfo">
                              <span>Assign Course Teacher</span><br/>
                              <strong>Exam</strong>: <span>{yourArray[0].year} year {yourArray[0].semester} semester, {yourArray[0].exam_year}</span><br/>
                              <strong>Department</strong>: <span>{userData.department}</span>
                          </p>
                        </div>
                      </div>
                      <div className="row g-3 my-2" id="assignTeacherSection">
                        <div className="col-3 assignTeacherSectionDiv2">
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
                        <div className="col-3 assignTeacherSectionDiv2">
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
                            UpdateInfoForCourseAssignment();
                          }}>
                            Assign Teacher
                          </button>
                        </div>
                      </div>
                      <div className="row g-3 my-2">
                        <button
                          className="btn btn-primary btn-outline-light btn-lg lButton"
                          onClick={() => {
                            handleCourseList();
                          }}>
                          Show the list of Courses
                        </button>
                        <button
                          className="btn btn-primary btn-outline-light btn-lg lButton"
                          onClick={() => {
                            handleTeacherList();
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
                                <th scope="col">Assigned teacher ID</th>
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
                                    <td>{course.teacher_id}</td>
                                    <td>{course.course_name}</td>
                                    <td>{course.course_code}</td>
                                    <td>{course.year}</td>
                                    <td>{course.semester}</td>
                                    <td>{course.exam_year}</td>
                                    <td>{course.course_type}</td>
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
                      {showCourseList && (
                      <div class="dropdown-container row">
                        <div className="col-10"> </div>
                        <div className="col-2 btnRight">
                          <button className="btn btn-primary btn-lg btnCreateExams"
                          onClick={() => {
                            SubmitCourses2();
                          }}>Submit course list</button>
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

export default AssignCourseTeacher2