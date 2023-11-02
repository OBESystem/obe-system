import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import Nav from './NavTeacher';
import Sidebar from './Sidebar';
import NA from './NeedAuthentication';
import './stylesCourseFile.css';
import Assignment from './CourseFileComponents/Assignment';
import ClassTest from './CourseFileComponents/ClassTest';
import FinalExam from './CourseFileComponents/FinalExam';


function CourseFile() {
  const location = useLocation();
  const data = location.state ? location.state.courseData : null;

  const [toggle, setToggle] = useState(true);
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [dept, setDept] = useState('');
  const [designation, setDesignation] = useState('');
  const [showCTlist, setShowCTlist] = useState(false);
  const [showAGNlist, setShowAGNlist] = useState(false);
  const Toggle = () =>{
    setToggle(!toggle)
  }

  useEffect(()=> {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth === 'true') {
      setAuth(true);
      axios.get('http://localhost:7000/TeacherDashboard')
      .then(res => {
        if(res.data.Status === "Success")
        {
          setAuth(true);
          localStorage.setItem('auth', 'true');
          setName(res.data.name);
          setUserId(res.data.user_id);
          setDept(res.data.dept);
          setDesignation(res.data.designation);
        }
      })
    }
    else
    {
      axios.get('http://localhost:7000/TeacherDashboard')
      .then(res => {
        if(res.data.Status === "Success")
        {
          setAuth(true);
          localStorage.setItem('auth', 'true');
          setName(res.data.name);
          setUserId(res.data.user_id);
          setDept(res.data.dept);
          setDesignation(res.data.designation);
        }
        else
        {
          setAuth(false);
        }
      })
    }
}, [])


  const navigate = useNavigate();
  //Reloading removes the user data

  const [CTinfo, setCTInfo] = useState([]);

  const GetCTInfo=(event) => {
    axios.get('http://localhost:7000/CTInfo', { params: { courseCode: data.courseCode, examYear: data.examYear } })
    .then(res =>{
      setCTInfo(res.data);
      //console.log(data.courseCode);
      //console.log(data.examYear);
      //console.log(res.data);
    })
    .catch(err => console.log(err));
  }

  const AddCT=(event) => {
    axios.post('http://localhost:7000/AddCT', { ctID: (CTinfo.length+1), courseCode: data.courseCode, examYear: data.examYear })
    .then(res =>{
      console.log((CTinfo.length+1));
      alert("New Class test is added..");
    })
    .catch(err => console.log(err));
  }

  const [AGNinfo, setAGNInfo] = useState([]);

  const GetAGNInfo=(event) => {
    axios.get('http://localhost:7000/AGNInfo', { params: { courseCode: data.courseCode, examYear: data.examYear } })
    .then(res =>{
      setAGNInfo(res.data);
      //console.log(data.courseCode);
      //console.log(data.examYear);
      //console.log(res.data);
    })
    .catch(err => console.log(err));
  }

  const AddAGN=(event) => {
    axios.post('http://localhost:7000/AddAGN', { agnID: (AGNinfo.length+1), courseCode: data.courseCode, examYear: data.examYear })
    .then(res =>{
      console.log((CTinfo.length+1));
      alert("New Assignment test is added..");
    })
    .catch(err => console.log(err));
  }

  const handleCourseFileSubmission=(event) => {
    axios.post('http://localhost:7000/SubmitCourseFile', { courseCode: data.courseCode, examYear: data.examYear })
    .then(res =>{
      alert("Course File is submitted..");
      navigate('/TeacherDashboard');
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="cnt1 container-fluid">
      {
         auth ?
          <div className="container-fluid bg-secondary min-vh-100">
            {toggle && 
            <div className="cnt1 row">
              <div className="col-2 bg-white">
                <Sidebar name={name} dept={dept} designation={designation}/>
              </div>
              <div className="col-10">
                <div className="px-3">
                  <Nav Toggle={Toggle} name={name}/>
                  <div className="container-fluid" id="courseFile">
                    <div className="row g-3 my-2">
                      <div className="col-md-12 p-1">
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content-around rounded">
                          <div className="col-md-12 courseInfo">
                            <p className="fs-2"><strong>Course title</strong>: <span>{data.courseName}</span></p>
                            <p className="fs-5"><strong>Course Code</strong>: <span>{data.courseCode}</span></p>
                            <p className="fs-5"><strong>Semester</strong>: <span>{data.year}</span> year <span>{data.semester}</span> semester</p>
                            <p className="fs-6"><strong>Type</strong>: <span>{data.courseType}</span></p>
                            <p className="fs-6"><strong>Credit</strong>: <span>{data.credit}</span></p>
                          </div>
                        </div>
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content around part rounded" id="assignment">
                          <p>
                            <label className="fs-2"><strong>Assignments:</strong></label>
                          </p>
                          <div>
                            {showAGNlist && 
                            (
                              <div className="wrapper">
                                {AGNinfo.slice(0, AGNinfo.length).map((agn,index) => {
                                return (
                                  <Assignment assignmentID={agn.agnID}/>
                                );
                              })}
                              </div>
                            )}
                          </div>
                          <div className="card card-body" id="AGNlist">
                          {showAGNlist && (<div className="row g-3 my-2">
                            <strong><span className="fs-3">List of assignments:</span></strong>
                            <table className="table table-responsive-sm table-striped table-bordered bg-white table-bordered border-primary text-center">
                              <thead>
                                <tr>
                                  <th scope="col">Assignment ID</th>
                                </tr>
                              </thead>
                              <tbody>
                              {AGNinfo.slice(0, AGNinfo.length).map((agn,index) => {
                              return (
                                <tr>
                                     <td>Assignment {agn.agnID}</td>
                                </tr>
                              );
                              })}
                              </tbody>
                            </table>
                            </div>)}
                          </div>
                          <div className="row">
                            <div className="col-2"></div>
                            <div className="col-3"><button className="btn btn-lg btn-primary btnAd" 
                              onClick={() => {
                                AddAGN();
                              }}>
                              Add Assignment</button></div>
                            <div className="col-2"></div>
                            <div className="col-3"> <button className="btn btn-lg btn-info btnSh" 
                            onClick={() => {
                              setShowAGNlist(!showAGNlist);
                              GetAGNInfo();
                            }}>
                            Show list of Assignments</button></div>
                            <div className="col-2"></div>
                          </div>
                        </div>
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content around part rounded" id="classTest">
                          <p>
                            <label className="fs-2"><strong>Class tests:</strong></label>
                          </p>
                          <div>
                            {showCTlist && 
                            (
                              <div className="wrapper">
                                {CTinfo.slice(0, CTinfo.length).map((ct,index) => {
                                return (
                                  <ClassTest ctID={ct.ctID} />
                                );
                              })}
                              </div>
                            )}
                          </div>
                          <div className="card card-body" id="CTlist">
                          {showCTlist && (<div className="row g-3 my-2">
                            <strong><span className="fs-3">List of class tests:</span></strong>
                            <table className="table table-responsive-sm table-striped table-bordered bg-white table-bordered border-primary text-center">
                              <thead>
                                <tr>
                                  <th scope="col">Class test ID</th>
                                </tr>
                              </thead>
                              <tbody>
                              {CTinfo.slice(0, CTinfo.length).map((ct,index) => {
                              return (
                                <tr>
                                     <td>Class test {ct.ctID}</td>
                                </tr>
                              );
                              })}
                              </tbody>
                            </table>
                            </div>)}
                          </div>
                          <div className="row">
                            <div className="col-2"></div>
                            <div className="col-3"><button className="btn btn-lg btn-primary btnAd" 
                              onClick={() => {
                                AddCT();
                              }}>
                              Add Class test</button></div>
                            <div className="col-2"></div>
                            <div className="col-3"> <button className="btn btn-lg btn-info btnSh" 
                            onClick={() => {
                              setShowCTlist(!showCTlist);
                              GetCTInfo();
                            }}>
                            Show list of Class Tests</button></div>
                            <div className="col-2"></div>
                          </div>
                        </div>
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content-around part rounded" id="finalExam">
                          <FinalExam />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3"></div>
                      <div className="col-6"><button className="btn btn-lg btn-primary" id="FST" onClick={() => {handleCourseFileSubmission();}}>Submit</button></div>
                      <div className="col-3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }

            {!toggle && 
            <div className="cnt1">
            <div className="px-3">
            <Nav Toggle={Toggle} name={name}/>
            <div className="container-fluid" id="courseFile">
                <div className="row g-3 my-2">
                    <div className="col-md-12 p-1">
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content-around rounded">
                            <div className="col-md-12 courseInfo">
                                  <p className="fs-2"><strong>Course title</strong>: <span>{data.courseName}</span></p>
                                  <p className="fs-5"><strong>Course Code</strong>: <span>{data.courseCode}</span></p>
                                  <p className="fs-5"><strong>Semester</strong>: <span>{data.year}</span> year <span>{data.semester}</span> semester</p>
                                  <p className="fs-6"><strong>Type</strong>: <span>{data.courseType}</span></p>
                                  <p className="fs-6"><strong>Credit</strong>: <span>{data.credit}</span></p>
                            </div>
                        </div>
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content around part rounded" id="assignment">
                          <p>
                            <label className="fs-2"><strong>Assignments:</strong></label>
                          </p>
                          <div className="wrapper">
                            <Assignment assignmentID="1"/>
                          </div>
                        </div>
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content around part rounded" id="classTest">
                          <p>
                            <label className="fs-2"><strong>Class tests:</strong></label>
                          </p>
                          <div className="wrapper">
                            <ClassTest ctID="1"/>
                            <ClassTest ctID="2"/>
                            <ClassTest ctID="3"/>
                          </div>
                        </div>
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content-around part rounded" id="finalExam">
                          <FinalExam />
                        </div>
                    </div>
                </div>
                <div className="row g-3 my-2">
                  
                </div>
            </div>
        </div>
        </div>}
        </div>
        :
          <div>
            <NA />
          </div>
      }
    </div>
  )
}

export default CourseFile