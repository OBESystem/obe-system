import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
//import axios from 'axios';
import Nav from './Nav';
import Sidebar from './Sidebar';
import NA from './NeedAuthentication';
import './stylesCourseFile.css';

function CourseFile() {
  const location = useLocation();
  const data = location.state ? location.state.courseData : null;

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
    <div className="cnt1 container-fluid">
      {
         auth ?
          <div className="container-fluid bg-secondary min-vh-100">
            {toggle && 
            <div className="cnt1 row">
              <div className="col-2 bg-white">
                <Sidebar name={name} dept={dept}/>
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
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content-around part rounded" id="assignment">
                          <p>
                            <label className="fs-2"><strong>Assessment:</strong></label>
                          </p>
                          <div>
                            <div className="card card-body">
                              <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                  <label htmlFor="assignmentTitle" className="form-label infoFormTitle">Title:</label>
                                  <input className="form-control" name="assignmentTitle" type="text" id="assignmentTitle" required/>
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="assignmentCp" className="form-label infoFormTitle">Compliance Form:</label>
                                  <input className="form-control" name="complianceFormAssignment" type="file" id="assignmentCp" required/>
                                </div>
                                <button type="reset" className="btn btn-secondary">Reset</button>
                                <button type="submit" className="btn btn-success btnSubmit">Submit</button>
                                <button type="submit" className="btn btn-lg btn-info btn-enterMarks">Enter Marks</button>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content around part rounded" id="classTest">
                          <p>
                            <label className="fs-2"><strong>Class tests:</strong></label>
                          </p>
                          <div className="wrapper">
                            <div className="item" id="classTest1">
                              <div className="card card-body">
                                <label id="courseFileClassTestTitle">Class Test 1</label>
                                <form onSubmit={handleSubmit}>
                                  <div className="mb-3">
                                    <label htmlFor="q1" className="form-label infoFormTitle">Question:</label>
                                    <input className="form-control" name="questionCT1" type="file" id="q1" required/>
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="cp1" className="form-label infoFormTitle">Compliance Form:</label>
                                    <input className="form-control" name="complianceFormCT1" type="file" id="cp1" required/>
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="ansH1" className="form-label infoFormTitle">Answer Script for Highest Marks Attained:</label>
                                    <input className="form-control" name="answerscriptBestCT1" type="file" id="ansH1" required/>
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="ansH1" className="form-label infoFormTitle">Answer Script for Average Marks Attained:</label>
                                    <input className="form-control" name="answerscriptAvgCT1" type="file" id="ansA1" required/>
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="ansL1" className="form-label infoFormTitle">Answer Script for Lowest Marks Attained:</label>
                                    <input className="form-control" name="answerscriptLowCT1" type="file" id="ansL1" required/>
                                  </div>
                                  <button type="reset" className="btn btn-secondary">Reset</button>
                                  <button type="submit" className="btn btn-success btnSubmit">Submit</button>
                                  <button type="submit" className="btn btn-lg btn-info btn-enterMarks">Enter Marks</button>
                                </form>
                              </div>
                            </div>
                            <div className="item" id="classTest2">
                              <div className="card card-body">
                                <label id="courseFileClassTestTitle">Class Test 2</label>
                                <form onSubmit={handleSubmit}>
                                  <div className="mb-3">
                                    <label htmlFor="q2" className="form-label infoFormTitle">Question:</label>
                                    <input className="form-control" name="questionCT2" type of="file" id="q2" required/>
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="cp2" className="form-label infoFormTitle">Compliance Form:</label>
                                    <input className="form-control" name="complianceFormCT2" type="file" id="cp2" required/>
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="ansH2" className="form-label infoFormTitle">Answer Script for Highest Marks Attained:</label>
                                    <input className="form-control" name="answerscriptBestCT2" type="file" id="ansH2" required/>
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="ansH2" className="form-label infoFormTitle">Answer Script for Average Marks Attained:</label>
                                    <input className="form-control" name="answerscriptAvgCT2" type="file" id="ansA2" required/>
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="ansL2" className="form-label infoFormTitle">Answer Script for Lowest Marks Attained:</label>
                                    <input className="form-control" name="answerscriptLowCT2" type="file" id="ansL2" required/>
                                  </div>
                                  <button type="reset" className="btn btn-secondary">Reset</button>
                                  <button type="submit" className="btn btn-success btnSubmit">Submit</button>
                                  <button type="submit" className="btn btn-lg btn-info btn-enterMarks">Enter Marks</button>
                                </form>
                              </div>
                            </div>
                            <div className="item" id="classTest3">
                              <div className="card card-body">
                                <label id="courseFileClassTestTitle">Class Test 3</label>
                                <form onSubmit={handleSubmit}>
                                  <div className="mb-3">
                                    <label htmlFor="q3" className="form-label infoFormTitle">Question:</label>
                                    <input className="form-control" name="questionCT3" type="file" id="q3" required/>
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="cp3" className="form-label infoFormTitle">Compliance Form:</label>
                                    <input className="form-control" name="complianceFormCT3" type="file" id="cp3" required/>
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="ansH3" className="form-label infoFormTitle">Answer Script for Highest Marks Attained:</label>
                                    <input className="form-control" name="answerscriptBestCT3" type="file" id="ansH3" required/>
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="ansH3" className="form-label infoFormTitle">Answer Script for Average Marks Attained:</label>
                                    <input className="form-control" name="answerscriptAvgCT3" type="file" id="ansA3" required/>
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="ansL3" className="form-label infoFormTitle">Answer Script for Lowest Marks Attained:</label>
                                    <input className="form-control" name="answerscriptLowCT3" type="file" id="ansL3" required/>
                                  </div>
                                  <button type="reset" className="btn btn-secondary">Reset</button>
                                  <button type="submit" className="btn btn-success btnSubmit">Submit</button>
                                  <button type="submit" className="btn btn-lg btn-info btn-enterMarks">Enter Marks</button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content-around part rounded" id="finalExam">
                          <p>
                            <label className="fs-2"><strong>Final exam:</strong></label>
                          </p>
                          <div>
                            <div className="card card-body">
                              <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                  <label htmlFor="finaLq1" className="form-label infoFormTitle">Question:</label>
                                  <input className="form-control" name="questionFinal1" type="file" id="finaLq1" required/>
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="finaLcp1" className="form-label infoFormTitle">Compliance Form:</label>
                                  <input className="form-control" name="complianceFormFinal1" type="file" id="finaLcp1" required/>
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="finaLansH1" className="form-label infoFormTitle">Answer Script for Highest Marks Attained:</label>
                                  <input className="form-control" name="answerscriptBestFinal1" type="file" id="finaLansH1"/>
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="finaLansH1" className="form-label infoFormTitle">Answer Script for Average Marks Attained:</label>
                                  <input className="form-control" name="answerscriptAvgFinal1" type="file" id="finaLansA1"/>
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="finaLansL1" className="form-label infoFormTitle">Answer Script for Lowest Marks Attained:</label>
                                  <input className="form-control" name="answerscriptLowFinal1" type="file" id="finaLansL1"/>
                                </div>
                                <button type="reset" className="btn btn-secondary">Reset</button>
                                <button type="submit" className="btn btn-success btnSubmit">Submit</button>
                                <button type="submit" className="btn btn-lg btn-info btn-enterMarks">Enter Marks</button>
                              </form>
                            </div>
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
                              <div className="row p-3 bg-white shadow-sm d-flex justify-content-around part rounded" id="assignment"> 
                                <p>
                                  <label className="fs-2"><strong>Assesment:</strong></label>
                                </p>
                                <div>
                                  <div className="card card-body">
                                    <form onSubmit={handleSubmit}>
                                      <div className="mb-3">
                                        <label for="assignmentTitle" className="form-label infoFormTitle">Title:</label>
                                        <input className="form-control" name="assignmentTitle" type="text" id="assignmentTitle" required/>
                                      </div>
                                      <div className="mb-3">
                                        <label for="assignmentCp" className="form-label infoFormTitle">Compliance Form:</label>
                                        <input className="form-control" name="complianceFormAssignment" type="file" id="assignmentCp" required/>
                                      </div>
                                      <button type="reset" class="btn btn-secondary">Reset</button>
                                      <button type="submit" class="btn btn-success btnSubmit">Submit</button>
                                      <button type="submit" class="btn btn-lg btn-info btn-enterMarks">Enter Marks</button>
                                    </form>
                                  </div>
                                </div>
                              </div>
                              <div className="row p-3 bg-white shadow-sm d-flex justify-content-around part rounded" id="classTest">
                                <p>
                                  <label className="fs-2"><strong>Class tests:</strong></label>
                                </p>
                                <div className="wrapper">
                                  <div className="item" id="classTest1">
                                    <div className="card card-body">
                                      <label id="courseFileClassTestTitle">Class Test 1</label>
                                      <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                          <label for="q1" className="form-label infoFormTitle">Question:</label>
                                          <input className="form-control" name="questionCT1" type="file" id="q1" required/>
                                        </div>
                                        <div className="mb-3">
                                          <label for="cp1" className="form-label infoFormTitle">Compliance Form:</label>
                                          <input className="form-control" name="complianceFormCT1" type="file" id="cp1" required/>
                                        </div>
                                        <div className="mb-3">
                                          <label for="ansH1" className="form-label infoFormTitle">Answer Script for Highest Marks Attained:</label>
                                          <input className="form-control" name="answerscriptBestCT1" type="file" id="ansH1" required/>
                                        </div>
                                        <div className="mb-3">
                                          <label for="ansH1" className="form-label infoFormTitle">Answer Script for Average Marks Attained:</label>
                                          <input className="form-control" name="answerscriptAvgCT1" type="file" id="ansA1" required/>
                                        </div>
                                        <div className="mb-3">
                                          <label for="ansL1" className="form-label infoFormTitle">Answer Script for Lowest Marks Attained:</label>
                                          <input className="form-control" name="answerscriptLowCT1" type="file" id="ansL1" required/>
                                        </div>
                                        <button type="reset" class="btn btn-secondary">Reset</button>
                                        <button type="submit" class="btn btn-success btnSubmit">Submit</button>
                                        <button type="submit" class="btn btn-lg btn-info btn-enterMarks">Enter Marks</button>
                                      </form>
                                    </div>
                                  </div>
                                  <div className="item" id="classTest2">
                                  <div className="card card-body">
                                    <label id="courseFileClassTestTitle">Class Test 2</label>
                                    <form onSubmit={handleSubmit}>
                                      <div className="mb-3">
                                        <label for="q2" className="form-label infoFormTitle">Question:</label>
                                        <input className="form-control" name="questionCT2" type="file" id="q2" required/>
                                      </div>
                                      <div className="mb-3">
                                        <label for="cp2" className="form-label infoFormTitle">Compliance Form:</label>
                                        <input className="form-control" name="complianceFormCT2" type="file" id="cp2" required/>
                                      </div>
                                      <div className="mb-3">
                                        <label for="ansH2" className="form-label infoFormTitle">Answer Script for Highest Marks Attained:</label>
                                        <input className="form-control" name="answerscriptBestCT2" type="file" id="ansH2" required/>
                                      </div>
                                      <div className="mb-3">
                                        <label for="ansH2" className="form-label infoFormTitle">Answer Script for Average Marks Attained:</label>
                                        <input className="form-control" name="answerscriptAvgCT2" type="file" id="ansA2" required/>
                                      </div>
                                      <div className="mb-3">
                                        <label for="ansL2" className="form-label infoFormTitle">Answer Script for Lowest Marks Attained:</label>
                                        <input className="form-control" name="answerscriptLowCT2" type="file" id="ansL2" required/>
                                      </div>
                                      <button type="reset" class="btn btn-secondary">Reset</button>
                                      <button type="submit" class="btn btn-success btnSubmit">Submit</button>
                                      <button type="submit" class="btn btn-lg btn-info btn-enterMarks">Enter Marks</button>
                                    </form>
                                  </div>
                                </div>
                                <div className="item" id="classTest3">
                                  <div className="card card-body">
                                  <label id="courseFileClassTestTitle">Class Test 3</label>
                                    <form onSubmit={handleSubmit}>
                                      <div className="mb-3">
                                        <label for="q3" className="form-label infoFormTitle">Question:</label>
                                        <input className="form-control" name="questionCT3" type="file" id="q3" required/>
                                      </div>
                                      <div className="mb-3">
                                        <label for="cp3" className="form-label infoFormTitle">Compliance Form:</label>
                                        <input className="form-control" name="complianceFormCT3" type="file" id="cp3" required/>
                                      </div>
                                      <div className="mb-3">
                                        <label for="ansH3" className="form-label infoFormTitle">Answer Script for Highest Marks Attained:</label>
                                        <input className="form-control" name="answerscriptBestCT3" type="file" id="ansH3" required/>
                                      </div>
                                      <div className="mb-3">
                                        <label for="ansH3" className="form-label infoFormTitle">Answer Script for Average Marks Attained:</label>
                                        <input className="form-control" name="answerscriptAvgCT3" type="file" id="ansA3" required/>
                                      </div>
                                      <div className="mb-3">
                                        <label for="ansL3" className="form-label infoFormTitle">Answer Script for Lowest Marks Attained:</label>
                                        <input className="form-control" name="answerscriptLowCT3" type="file" id="ansL3" required/>
                                      </div>
                                      <button type="reset" class="btn btn-secondary">Reset</button>
                                      <button type="submit" class="btn btn-success btnSubmit">Submit</button>
                                      <button type="submit" class="btn btn-lg btn-info btn-enterMarks">Enter Marks</button>
                                    </form>
                                  </div>
                                </div>
                                </div>
                              </div>
                              <div className="row p-3 bg-white shadow-sm d-flex justify-content-around part rounded" id="finalExam">
                                <p>
                                  <label className="fs-2"><strong>Final exam:</strong></label>
                                </p>
                                <div>
                                  <div className="card card-body">
                                    <form onSubmit={handleSubmit}>
                                      <div className="mb-3">
                                        <label for="finaLq1" className="form-label infoFormTitle">Question:</label>
                                        <input className="form-control" name="questionFinal1" type="file" id="finaLq1" required/>
                                      </div>
                                      <div className="mb-3">
                                        <label for="finaLcp1" className="form-label infoFormTitle">Compliance Form:</label>
                                        <input className="form-control" name="complianceFormFinal1" type="file" id="finaLcp1" required/>
                                      </div>
                                      <div className="mb-3">
                                        <label for="finaLansH1" className="form-label infoFormTitle">Answer Script for Highest Marks Attained:</label>
                                        <input className="form-control" name="answerscriptBestFinal1" type="file" id="finaLansH1"/>
                                      </div>
                                      <div className="mb-3">
                                        <label for="finaLansH1" className="form-label infoFormTitle">Answer Script for Average Marks Attained:</label>
                                        <input className="form-control" name="answerscriptAvgFinal1" type="file" id="finaLansA1"/>
                                      </div>
                                      <div className="mb-3">
                                        <label for="finaLansL1" className="form-label infoFormTitle">Answer Script for Lowest Marks Attained:</label>
                                        <input className="form-control" name="answerscriptLowFinal1" type="file" id="finaLansL1"/>
                                      </div>
                                      <button type="reset" class="btn btn-secondary">Reset</button>
                                      <button type="submit" class="btn btn-success btnSubmit">Submit</button>
                                      <button type="submit" class="btn btn-lg btn-info btn-enterMarks">Enter Marks</button>
                                    </form>
                                  </div>
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

export default CourseFile