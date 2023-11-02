import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from './NavAdmin';
import Sidebar from './AdminSidebar';
import NA from './NeedAuthentication';
import './stylesUploadAcademicCalendar.css';

function UploadAcademicCalendar() {
  // const location = useLocation();
  // const data = location.state ? location.state.courseData : null;

  const [toggle, setToggle] = useState(true);
  const [auth, setAuth] = useState(true);
  const [name, setName] = useState('Dr. Md. Golam Moazzam');
  const [id, setId] = useState('');
  const [dept, setDept] = useState('CSE');
  const Toggle = () =>{
    setToggle(!toggle)
  }
  
  const handleSubmit=(event) => {
    event.preventDefault();
  }

  /*useEffect(()=> {
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
          setId(res.data.id);
          setDept(res.data.dept);
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
          setId(res.data.id);
          setDept(res.data.dept);
        }
        else
        {
          setAuth(false);
        }
      })
    }
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
  }*/  /* BACKEND PART */

  const navigate = useNavigate();
  //Reloading removes the user data
  
  const [info, setInfo] = useState([]);

  return (
    <div className="Ua container-fluid">
      {
         auth ?
          <div className="container-fluid bg-secondary min-vh-100">
            {toggle && 
            <div className="cnt1 row">
              <div className="col-2 bg-white">
                <Sidebar name={"Rubayed"} dept={"CSE"}/>
              </div>
              <div className="col-10">
                <div className="px-3">
                  <Nav Toggle={Toggle} name={"Rubayed"}/>
                  <div className="container-fluid" id="courseFile">
                    <div className="row g-3 my-2">
                      <div className="col-md-12 p-1">
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content-around rounded">
                          <div className="col-md-12 courseInfo">
                            <p className="fs-2"><strong>Department</strong>: <span>{"Computer Science and Engineering"}</span></p>
                            
                          </div>
                        </div>
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content-around part rounded" id="assignment">
                          <p>
                            <label className="fs-2"><strong>Upload Academic Calendar</strong></label>
                          </p>
                          <div>
                            <div className="card card-body">
                              <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                  <input className="form-control" name="complianceFormAssignment" type="file" id="assignmentCp" required/>
                                </div>
                                <button type="reset" className="btn btn-secondary">Reset</button>
                                <button type="submit" className="btn btn-success btnSubmit">Submit</button>
                                
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content around part rounded" id="classTest">
                          <p>
                            <label className="fs-2"><strong>Academic Calendar</strong></label>
                          </p>
                          <div className="wrapper">
                            
                            Here The PDF of existing academic calendar will be shown
                            
                          </div>
                        </div>

                      </div>
                    </div>
                    <div className="row g-3 my-2">
                    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }

                  {!toggle && 
                  <div className="cnt1">
                 <div className="px-3">
                  <Nav Toggle={Toggle} name={"Rubayed"}/>
                  <div className="container-fluid" id="courseFile">
                    <div className="row g-3 my-2">
                      <div className="col-md-12 p-1">
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content-around rounded">
                          <div className="col-md-12 courseInfo">
                            <p className="fs-2"><strong>Department</strong>: <span>{"Computer Science and Engineering"}</span></p>
                            
                          </div>
                        </div>
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content-around part rounded" id="assignment">
                          <p>
                            <label className="fs-2"><strong>Upload Academic Calendar</strong></label>
                          </p>
                          <div>
                            <div className="card card-body">
                              <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                  <input className="form-control" name="complianceFormAssignment" type="file" id="assignmentCp" required/>
                                </div>
                                <button type="reset" className="btn btn-secondary">Reset</button>
                                <button type="submit" className="btn btn-success btnSubmit">Submit</button>
                                
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content around part rounded" id="classTest">
                          <p>
                            <label className="fs-2"><strong>Academic Calendar</strong></label>
                          </p>
                          <div className="wrapper">
                            
                            Here The PDF of existing academic calendar will be shown
                            
                          </div>
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

export default UploadAcademicCalendar;
