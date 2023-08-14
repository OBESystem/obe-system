import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Nav from './Nav';
import Sidebar from './Sidebar';
import NA from './NeedAuthentication';
import './stylesTDB.css';

function TeacherDashboard() {
  const [toggle, setToggle] = useState(true);
  const [showCourseList, setShowCourseList] = useState(false);
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [dept, setDept] = useState('');
  const Toggle = () =>{
    setToggle(!toggle)
  }

  useEffect(()=> {
    axios.get('http://localhost:7000/TeacherDashboard')
    .then(res => {
      if(res.data.Status === "Success")
      {
         setAuth(true);
         setName(res.data.name);
         setId(res.data.id);
         setDept(res.data.dept);
      }
      else
      {
        setAuth(false);
      }
    })
}, [])

  const [info, setInfo] = useState([]);

  const GetInfo=(event) => {
    axios.get('http://localhost:7000/TeacherInfo', { params: { id: id } })
    .then(res =>{
      setInfo(res.data);
      //console.log("Info of "+ id);
      //console.log(res.data);
    })
    .catch(err => console.log(err));
  }

  console.log();
  return (
    <div className="container-fluid">
      {
         auth ?
              <div className="container-fluid bg-secondary min-vh-100">
                <div className="row cnt">
                  {toggle && <div className="col-4 col-md-2 bg-white vh-100 sBar">
                    <Sidebar name={name} dept={dept}/>
                  </div>}
                  <div className="col">
                  <div className="px-3">
                  <Nav Toggle={Toggle} name={name}/>
                  <div className="container-fluid">
                      <div className="row g-3 my-2">
                          <div className="col-md-3 p-1">
                              <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                  <div>
                                      <h3 className="fs-2">2</h3>
                                      <p className="fs-5">Due Course File Submissions</p>
                                  </div>
                                  <i className="bi bi-card-list p-3 fs-1"></i>
                              </div>
                          </div>
                          <div className="col-md-3 p-1">
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
                          GetInfo();
                        }}>Show the list of Courses</button>
                      </div>
                      {showCourseList && (<div className="row g-3 my-2">
                      <strong><span className="fs-3">List of courses:</span></strong>
                      <table className="table table-responsive-sm table-striped table-bordered bg-white text-center">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Course Code</th>
                            <th scope="col">Year</th>
                            <th scope="col">Semester</th>
                            <th scope="col">Course type</th>
                            <th scope="col">Credit</th>
                          </tr>
                        </thead>
                        <tbody>
                        {info.slice(0, info.length).map((course,index) => {
                        return (
                          <tr>
                              <td>{index+1}</td>
                              <td>{course.courseName}</td>
                              <td>{course.courseCode}</td>
                              <td>{course.year}</td>
                              <td>{course.semester}</td>
                              <td>{course.courseType}</td>
                              <td>{course.credit}</td>
                          </tr>
                        );
                        })}
                        </tbody>
                      </table>
                      </div>)}
                  </div>
              </div>
              </div>
            </div>
          </div>
        :

          <div>
            <NA />
          </div>
      }
    </div>
  )
}

export default TeacherDashboard;
