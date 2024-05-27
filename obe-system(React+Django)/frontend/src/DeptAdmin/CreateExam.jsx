import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./NavAdmin";
import Sidebar from "./AdminSidebar";
import NA from "./NeedAuthentication";
import "./stylesCreateExam.css";
import { getToken} from '../services/LocalStorageService'
import { useGetLoggedUserQuery, useAddCourseMutation, useGetCourseListByExamMutation} from '../services/obesApi'

function CreateExam() {
    const [toggle, setToggle] = useState(true);
    const {access_token} = getToken();
    const navigate = useNavigate();
    const {data, isSuccess} = useGetLoggedUserQuery(access_token);
    const [getCourseListByExam] = useGetCourseListByExamMutation()
    const [addCourse] = useAddCourseMutation()
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
    
    const [tempValues, setTempValues] = useState({
      exam_year: '',
      year: '',
      semester: ''
    })

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
        id: 0,
        teacher_id: '0',
        exam_year: '',
        year: '',
        semester: '',
        course_name: '',
        course_code: '',
        course_type: '',
        credit: '',
        is_course_file_submitted: false
    })
    
    const handleInput=(event) => {
      setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
    }

    const handleTempInput=(event) => {
      setTempValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
    }
  
    const [addedCourseInfo, setAddedCourseInfo] = useState([]);
    const AddCourse = () => {
      if(
        values.exam_year === '' ||
        values.year === '' ||
        values.semester === '' 
      )
      {
        alert("Examination is not created provided yet!!");
      }
      else
      {
        if(
          values.course_name !=='' &&
          values.course_code !== '' &&
          values.course_type !== '' &&
          values.credit !== ''
        )
        {
          setAddedCourseInfo([...addedCourseInfo, values]);
          alert("The course is added successfully..");
        }
        else
        {
          alert("Enter the required informations first!!");
        }
      }
    };

    const DeleteCourse = (index) => {
      const updatedCourseInfo = [...addedCourseInfo.slice(0, index), ...addedCourseInfo.slice(index + 1)];
      setAddedCourseInfo(updatedCourseInfo);
    };

    const CreateExam = async() => {
      if(tempValues.year!=='' && tempValues.year!=='None' && tempValues.semester!=='' && tempValues.semester!=='None' && tempValues.exam_year!=='' && tempValues.exam_year!=='None')
      {
        const res = await getCourseListByExam({exam_year : tempValues.exam_year, year : tempValues.year, semester : tempValues.semester});
        setAddedCourseInfo(res.data);
        setValues((prevValues) => ({
          ...prevValues, 
          year: tempValues.year, 
          semester: tempValues.semester, 
          exam_year: tempValues.exam_year
        }));
        if(!res.error)
        {
          alert("Information of the examination can be edited now..");
        }
        else
        {
          console.log(res.error)
        }
      }
      else
      {
        alert("Required information of the examination are not provided yet!!");
      }
    };
    
    const SubmitCourses = async() => {
      if(addedCourseInfo.length > 0)
      {
        var error = 0;
        for (const courseData of addedCourseInfo) 
        {
          if(courseData.id === 0)
          {
            const actualData = {
              c_id: courseData.id,
              department: userData.department,
              teacher_id: courseData.teacher_id,
              exam_year: courseData.exam_year[0],
              year: courseData.year[0],
              semester: courseData.semester[0],
              course_name: courseData.course_name[0],
              course_code: courseData.course_code[0],
              course_type: courseData.course_type[0],
              credit: courseData.credit[0]
            }
            //console.log(actualData)
            const res = await addCourse(actualData);
            if (res.error)
            {
              error++;
            }
          }
          else
          {
            const actualData = {
              c_id: courseData.id,
              department: userData.department,
              teacher_id: courseData.teacher_id,
              exam_year: courseData.exam_year,
              year: courseData.year,
              semester: courseData.semester,
              course_name: courseData.course_name,
              course_code: courseData.course_code,
              course_type: courseData.course_type,
              credit: courseData.credit
            }
            //console.log(actualData)
            const res = await addCourse(actualData);
            if (res.error)
            {
              error++;
            }
          }
        }
        if(error === 0)
        {
          alert('Examination informartion is submitted successfully..')
          window.location.reload();
        }
        else
        {
          alert('Some error has occured!!')
        }
      }
      else
      {
        alert("No course is added yet!!");
      }
    };

    const AssignCourseTeacher = () => {
      if(addedCourseInfo.length > 0)
      {
        navigate('/CreateExamAndAssignCourse', {state: { yourArray: addedCourseInfo }});
      }
      else
      {
        alert("No course is added yet!!");
      }
    }
    
  
    return (
      <div className="cntCreateExam container-fluid">
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
              <div className="cntCreateExam row min-vh-100">
                <div className="col-2 bg-white">
                  <Sidebar name={userData.name} dept={userData.department} designation={userData.designation} profile_picture= {userData.profile_picture} />
                </div>
                <div className="col-10">
                  <div className="px-3">
                    <Nav Toggle={Toggle} name={userData.name}  />
                    <div className="container-fluid">
                        <div className="row g-3 my-2">
                            <div className="card card-body">
                                <p className="fs-2 courseInfo">
                                    <span className="fs-1">Manage Exam</span><br/>
                                    <strong>Department</strong>: <span>{userData.department}</span>
                                </p>
                            </div>
                        </div>
                        <div className="row g-3 my-2" id="searchTabCreateExam">
                            {/*<label>{values.department+" "+values.examYear+" "+values.year+" "+values.semester}</label>*/}
                            <div class="dropdown-container row">
                            <div className="col-4"> <label htmlFor="exam_year" className="searchTabCreateELabel"><strong>Select Exam Year: </strong></label> </div>
                            <div className="col-8">
                            <select className="form-select drdwE" aria-label="Default select example" name="exam_year" id="exam_year" onChange={handleTempInput}>
                                <option selected defaultValue="">None</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                            </select>
                            </div>
                            </div>
                            <div class="dropdown-container row">
                            <div className="col-4"> <label htmlFor="year" className="searchTabCreateELabel"><strong>Select Year and Semester: </strong></label> </div>
                            <div className="col-4">
                            <select className="form-select drdwE" aria-label="Default select example" id="year" name="year" onChange={handleTempInput}>
                                <option selected defaultValue="">None</option>
                                <option value="1st">1st year</option>
                                <option value="2nd">2nd Year</option>
                                <option value="3rd">3rd Year</option>
                                <option value="4th">4th Year</option>
                            </select>
                            </div>
                            <div className="col-4">
                            <select className="form-select drdwE" aria-label="Default select example" name="semester" onChange={handleTempInput}>
                                <option selected defaultValue="">None</option>
                                <option value="1st">1st Semester</option>
                                <option value="2nd">2nd Semester</option>
                            </select>
                            </div>
                            </div>
                            <div class="dropdown-container row">
                            <div className="col-10"> </div>
                            <div className="col-2 btnRight">
                              <button className="btn btn-primary btn-lg btnCreateExams"
                              onClick={() => {
                                CreateExam();
                              }}>Create/Edit Exam</button>
                            </div>
                            </div>
                        </div>
                        <div className="row g-3 my-2" id="searchTabCreateExam">
                            <div class="dropdown-container row">
                            <div className="col-4"> <label htmlFor="course_name" className="searchTabCreateELabel"><strong>Enter course name: </strong></label> </div>
                            <div className="col-8">
                              <input className="form-control inputForCreatingExam" type="text" id="course_name" name="course_name" onChange={handleInput}/>
                            </div>
                            </div>
                            <div class="dropdown-container row">
                            <div className="col-4"> <label htmlFor="course_code" className="searchTabCreateELabel"><strong>Enter course code: </strong></label> </div>
                            <div className="col-8">
                              <input className="form-control inputForCreatingExam" type="text" id="course_code" name="course_code" onChange={handleInput}/>
                            </div>
                            </div>
                            <div class="dropdown-container row">
                            <div className="col-4"> <label htmlFor="course_type" className="searchTabCreateELabel"><strong>Enter course type: </strong></label> </div>
                            <div className="col-8">
                              <input className="form-control inputForCreatingExam" type="text" id="course_type" name="course_type" onChange={handleInput}/>
                            </div>
                            </div>
                            <div class="dropdown-container row">
                            <div className="col-4"> <label htmlFor="credit" className="searchTabCreateELabel"><strong>Enter course credit: </strong></label> </div>
                            <div className="col-8">
                              <input className="form-control inputForCreatingExam" type="text" id="credit" name="credit" onChange={handleInput}/>
                            </div>
                            </div>
                            <div class="dropdown-container row">
                            <div className="col-10"> </div>
                            <div className="col-2 btnRight">
                              <button className="btn btn-primary btn-lg btnCreateExams"
                              onClick={() => {
                                AddCourse();
                              }}>Add Course</button>
                            </div>
                            </div>
                        </div>
                        <div className="row g-3 my-2">
                          <strong>
                            <span className="fs-3">List of Added Courses:</span>
                          </strong>
                          <div className="CourseTableAddedCourse">
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
                              {addedCourseInfo.slice(0, addedCourseInfo.length).map((course, index) => {
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
                                    <td>
                                    <button className="btn btn-danger" onClick={() => {DeleteCourse(index);}}>Delete</button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                          </div>
                      </div>
                      <div class="dropdown-container row">
                        <div className="col-2">
                          <button className="btn btn-primary btn-lg btnCreateExams"
                          onClick={() => {
                            AssignCourseTeacher();
                          }}>Assign Teacher</button>
                        </div>
                        <div className="col-8"> </div>
                        <div className="col-2 btnRight">
                          <button className="btn btn-primary btn-lg btnCreateExams"
                          onClick={() => {
                            SubmitCourses();
                          }}>Submit course list</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
  
            {!toggle && (
              <div className="cntCreateExam min-vh-100.">
                <div className="px-3">
                    <Nav Toggle={Toggle} name={userData.name}  />
                    <div className="container-fluid">
                        <div className="row g-3 my-2">
                            <div className="card card-body">
                                <p className="fs-2 courseInfo">
                                    <span className="fs-1">Manage Exam</span><br/>
                                    <strong>Department</strong>: <span>{userData.department}</span>
                                </p>
                            </div>
                        </div>
                        <div className="row g-3 my-2" id="searchTabCreateExam">
                            {/*<label>{values.department+" "+values.examYear+" "+values.year+" "+values.semester}</label>*/}
                            <div class="dropdown-container row">
                            <div className="col-4"> <label htmlFor="exam_year" className="searchTabCreateELabel"><strong>Select Exam Year: </strong></label> </div>
                            <div className="col-8">
                            <select className="form-select drdwE" aria-label="Default select example" name="exam_year" id="exam_year" onChange={handleTempInput}>
                                <option selected defaultValue="">None</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                            </select>
                            </div>
                            </div>
                            <div class="dropdown-container row">
                            <div className="col-4"> <label htmlFor="year" className="searchTabCreateELabel"><strong>Select Year and Semester: </strong></label> </div>
                            <div className="col-4">
                            <select className="form-select drdwE" aria-label="Default select example" id="year" name="year" onChange={handleTempInput}>
                                <option selected defaultValue="">None</option>
                                <option value="1st">1st year</option>
                                <option value="2nd">2nd Year</option>
                                <option value="3rd">3rd Year</option>
                                <option value="4th">4th Year</option>
                            </select>
                            </div>
                            <div className="col-4">
                            <select className="form-select drdwE" aria-label="Default select example" name="semester" onChange={handleTempInput}>
                                <option selected defaultValue="">None</option>
                                <option value="1st">1st Semester</option>
                                <option value="2nd">2nd Semester</option>
                            </select>
                            </div>
                            </div>
                            <div class="dropdown-container row">
                            <div className="col-10"> </div>
                            <div className="col-2 btnRight">
                              <button className="btn btn-primary btn-lg btnCreateExams"
                              onClick={() => {
                                CreateExam();
                              }}>Create/Edit Exam</button>
                            </div>
                            </div>
                        </div>
                        <div className="row g-3 my-2" id="searchTabCreateExam">
                            <div class="dropdown-container row">
                            <div className="col-4"> <label htmlFor="course_name" className="searchTabCreateELabel"><strong>Enter course name: </strong></label> </div>
                            <div className="col-8">
                              <input className="form-control inputForCreatingExam" type="text" id="course_name" name="course_name" onChange={handleInput}/>
                            </div>
                            </div>
                            <div class="dropdown-container row">
                            <div className="col-4"> <label htmlFor="course_code" className="searchTabCreateELabel"><strong>Enter course code: </strong></label> </div>
                            <div className="col-8">
                              <input className="form-control inputForCreatingExam" type="text" id="course_code" name="course_code" onChange={handleInput}/>
                            </div>
                            </div>
                            <div class="dropdown-container row">
                            <div className="col-4"> <label htmlFor="course_type" className="searchTabCreateELabel"><strong>Enter course type: </strong></label> </div>
                            <div className="col-8">
                              <input className="form-control inputForCreatingExam" type="text" id="course_type" name="course_type" onChange={handleInput}/>
                            </div>
                            </div>
                            <div class="dropdown-container row">
                            <div className="col-4"> <label htmlFor="credit" className="searchTabCreateELabel"><strong>Enter course credit: </strong></label> </div>
                            <div className="col-8">
                              <input className="form-control inputForCreatingExam" type="text" id="credit" name="credit" onChange={handleInput}/>
                            </div>
                            </div>
                            <div class="dropdown-container row">
                            <div className="col-10"> </div>
                            <div className="col-2 btnRight">
                              <button className="btn btn-primary btn-lg btnCreateExams"
                              onClick={() => {
                                AddCourse();
                              }}>Add Course</button>
                            </div>
                            </div>
                        </div>
                        <div className="row g-3 my-2">
                          <strong>
                            <span className="fs-3">List of Added Courses:</span>
                          </strong>
                          <div className="CourseTableAddedCourse">
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
                              {addedCourseInfo.slice(0, addedCourseInfo.length).map((course, index) => {
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
                                    <td>
                                    {course.id==='0' ? <button className="btn btn-danger disabled deleteCourseBtn">Delete</button>
                                      : <button className="btn btn-danger deleteCourseBtn" onClick={() => {DeleteCourse(index);}}>Delete</button>}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                          </div>
                      </div>
                      <div class="dropdown-container row">
                        <div className="col-2">
                          <button className="btn btn-primary btn-lg btnCreateExams"
                          onClick={() => {
                            AssignCourseTeacher();
                          }}>Assign Teacher</button>
                        </div>
                        <div className="col-8"> </div>
                        <div className="col-2 btnRight">
                          <button className="btn btn-primary btn-lg btnCreateExams"
                          onClick={() => {
                            SubmitCourses();
                          }}>Submit course list</button>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            )}
          </div>
        }
      </div>
    );
}

export default CreateExam