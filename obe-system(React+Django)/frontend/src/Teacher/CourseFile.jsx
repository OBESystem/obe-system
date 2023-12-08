import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import Nav from './NavTeacher';
import Sidebar from './Sidebar';
import NA from './NeedAuthentication';
import './stylesCourseFile.css';
import Assignment from './CourseFileComponents/Assignment';
import ClassTest from './CourseFileComponents/ClassTest';
import FinalExam from './CourseFileComponents/FinalExam';
import { getToken} from '../services/LocalStorageService'
import { useGetLoggedUserQuery, useAddAssignmentMutation, useGetAssignmentListMutation, useAddClassTestMutation, useGetClassTestListMutation,useGetFinalExamInfoMutation, useSubmitCourseFileMutation} from '../services/obesApi'

function CourseFile() {
  const location = useLocation();
  const courseData = location.state ? location.state.courseData : null;
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(true);
  const {refresh_token,access_token} = getToken();
  const {data, isSuccess} = useGetLoggedUserQuery(access_token)
  const [addAssignment] = useAddAssignmentMutation()
  const [addClassTest] = useAddClassTestMutation()
  const [getAssignmentList] =  useGetAssignmentListMutation()
  const [getClassTestList] = useGetClassTestListMutation()
  const [getFinalExamInfo] = useGetFinalExamInfoMutation();
  const [submitCourseFile] = useSubmitCourseFileMutation()
  const [userData, setUserData] = useState({
     name: '',
     email: '',
     department: '',
     designation: '',
     userType: '',
     id: '',
  })
  const [showCTlist, setShowCTlist] = useState(false);
  const [showAGNlist, setShowAGNlist] = useState(false);
  const Toggle = () =>{
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
  const [CTinfo, setCTInfo] = useState([]);
  const [AGNinfo, setAGNInfo] = useState([]);
  const GetCTInfo= async(event) => {
    const res = await getClassTestList({course_code : courseData.course_code, exam_year:courseData.exam_year});
    setCTInfo(res.data);
    return res.data;
  }
  const AddCT= async(event) => {
    const actualData = {
      ct_id: (CTinfo.length+1),
      course_code: courseData.course_code,
      exam_year: courseData.exam_year,
    }
    const res = await addClassTest(actualData);
    //console.log(res.error)
  }
  const GetAGNInfo= async(event) => {
    const res = await getAssignmentList({course_code : courseData.course_code, exam_year:courseData.exam_year});
    setAGNInfo(res.data);
    return res.data;
  }
  const AddAGN= async(event) => {
    const actualData = {
      agn_id: (AGNinfo.length+1),
      course_code: courseData.course_code,
      exam_year: courseData.exam_year,
    }
    const res = await addAssignment(actualData);
    //console.log(res.error)
  }

  const [checkedLog, setCheckedLog] = useState([])
  const checkMissingInfo = (ctinfo,agninfo,feinfo) => {
    //console.log("Checking..")
    let logMessages = [];
    agninfo.slice(0, agninfo.length).map((agn,index) => {
      if(!agn.title)
      {
        logMessages.push('Title of Assignment '+agn.agn_id+' is missing')
      }
      if(!agn.compliance_form)
      {
        logMessages.push('Compliance form of Assignment '+agn.agn_id+' is missing')
      }
    })
    ctinfo.slice(0, ctinfo.length).map((ct,index) => {
      if(!ct.question)
      {
        logMessages.push('Question of Class test '+ct.ct_id+' is missing')
      }
      if(!ct.compliance_form)
      {
        logMessages.push('Compliance of Class test '+ct.ct_id+' is missing')
      }
      if(!ct.best_answersheet)
      {
        logMessages.push('Best answersheet of Class test '+ct.ct_id+' is missing')
      }
      if(!ct.average_answersheet)
      {
        logMessages.push('Average answersheet of Class test '+ct.ct_id+' is missing')
      }
      if(!ct.worst_answersheet)
      {
        logMessages.push('Worst answersheet of Class test '+ct.ct_id+' is missing')
      }
    })
    if(!feinfo.question)
    {
      logMessages.push('Question of Final Exam is missing')
    }
    if(!feinfo.compliance_form)
    {
      logMessages.push('Compliance of Final Exam is missing')
    }
    if(!feinfo.best_answersheet)
    {
      logMessages.push('Best answersheet of Final Exam is missing')
    }
    if(!feinfo.average_answersheet)
    {
      logMessages.push('Average answersheet of Final Exam is missing')
    }
    if(!feinfo.worst_answersheet)
    {
      logMessages.push('Worst answersheet of Final Exam is missing')
    }
    setCheckedLog(logMessages)
    return logMessages;
  }
  const handleCourseFileSubmission= async(event) => {
    const ctinfo = await GetCTInfo()
    const agninfo = await GetAGNInfo();
    const res = await getFinalExamInfo({course_code : courseData.course_code, exam_year:courseData.exam_year});
    const confirmation = window.confirm("Are you sure you want to submit the course file?");
    if (confirmation) 
    {
        const feinfo = res.data[0]
        const logMessages = checkMissingInfo(ctinfo, agninfo, feinfo);
        if(logMessages.length > 0)
        {
          //console.log(logMessages)
          alert("Errors are found. Check them below the ''Submit'' button!!!!")
        }
        else
        {
          const actualData = {
            id: courseData.id,
            is_course_file_submitted: true,
          }
          const res = await submitCourseFile(actualData);
          //Also need to update teacher's info
          navigate('/TeacherDashboard');
        }
    }
  }

  return (
    <div className="cnt1 container-fluid">
      {!refresh_token ? 
          <div>
            {navigate('/Login')}
          </div> :
          userData.userType !== '1' ? 
          <div>
            {<NA />}
          </div>
         :
          <div className="container-fluid bg-secondary min-vh-100">
          {toggle && 
          <div className="cnt1 row">
            <div className="col-2 bg-white">
              <Sidebar name={userData.name} dept={userData.department} designation={userData.designation}/>
            </div>
            <div className="col-10">
              <div className="px-3">
                <Nav Toggle={Toggle} name={userData.name}/>
                <div className="container-fluid" id="courseFile">
                  <div className="row g-3 my-2">
                    <div className="col-md-12 p-1">
                      <div className="row p-3 bg-white shadow-sm d-flex justify-content-around rounded">
                        <div className="col-md-12 courseInfo">
                          <p className="fs-2"><strong>Course title</strong>: <span>{courseData.course_name}</span></p>
                          <p className="fs-5"><strong>Course Code</strong>: <span>{courseData.course_code}</span></p>
                          <p className="fs-5"><strong>Semester</strong>: <span>{courseData.year}</span> year <span>{courseData.semester}</span> semester, <span>{courseData.exam_year}</span></p>
                          <p className="fs-6"><strong>Type</strong>: <span>{courseData.course_type}</span></p>
                          <p className="fs-6"><strong>Credit</strong>: <span>{courseData.credit}</span></p>
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
                                <Assignment id={agn.id} />
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
                                    <td>Assignment {agn.agn_id}</td>
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
                              setShowAGNlist(false);
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
                                <ClassTest id={ct.id} />
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
                                    <td>Class test {ct.ct_id}</td>
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
                              setShowCTlist(false);
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
                        <FinalExam course_code={courseData.course_code} exam_year={courseData.exam_year}/>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3"></div>
                    <div className="col-6">
                      <button className="btn btn-lg btn-primary" id="FST" onClick={() => {handleCourseFileSubmission();}}>Submit</button>
                      <div className="row">
                          {checkedLog.length > 0 &&
                          <div className="box mb-3">
                            <div className="p-3 bg-white d-flex justify-content-center rounded">
                              <div className="text-danger fs-6">
                                <p className="fs-4 text-center">Errors!!</p>
                                {checkedLog.slice(0, checkedLog.length).map((cl, index) => {
                                  return (
                                    <p>{index+1}. {cl}.</p>
                                  );
                                })}
                              </div>
                            </div>
                          </div>}
                      </div>
                    </div>
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
          <Nav Toggle={Toggle} name={userData.name}/>
          <div className="container-fluid" id="courseFile">
            <div className="row g-3 my-2">
              <div className="col-md-12 p-1">
                <div className="row p-3 bg-white shadow-sm d-flex justify-content-around rounded">
                  <div className="col-md-12 courseInfo">
                        <p className="fs-2"><strong>Course title</strong>: <span>{courseData.course_name}</span></p>
                        <p className="fs-5"><strong>Course Code</strong>: <span>{courseData.course_code}</span></p>
                        <p className="fs-5"><strong>Semester</strong>: <span>{courseData.year}</span> year <span>{courseData.semester}</span> semester, <span>{courseData.exam_year}</span></p>
                        <p className="fs-6"><strong>Type</strong>: <span>{courseData.course_type}</span></p>
                        <p className="fs-6"><strong>Credit</strong>: <span>{courseData.credit}</span></p>
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
                          <Assignment id={agn.id} />
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
                              <td>Assignment {agn.agn_id}</td>
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
                        setShowAGNlist(false);
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
                          <ClassTest id={ct.id} />
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
                              <td>Class test {ct.ct_id}</td>
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
                        setShowCTlist(false);
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
                  <FinalExam course_code={courseData.course_code} exam_year={courseData.exam_year}/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-3"></div>
              <div className="col-6">
                <button className="btn btn-lg btn-primary" id="FST" onClick={() => {handleCourseFileSubmission();}}>Submit</button>
                <div className="row">
                  {checkedLog.length > 0 &&
                  <div className="box mb-3">
                    <div className="p-3 bg-white d-flex rounded">
                      <div className="text-danger fs-6">
                        {checkedLog.slice(0, checkedLog.length).map((cl, index) => {
                          return (
                            <p>{index+1}. {cl}.</p>
                          );
                        })}
                      </div>
                    </div>
                  </div>}
              </div>
              </div>
              <div className="col-3"></div>
            </div>
          </div>
        </div>
      </div>}
     </div>
      }
    </div>
  )
}

export default CourseFile