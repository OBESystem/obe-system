import React, { useState, useEffect } from "react";
import Nav from "./NavAdmin";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Sidebar from "./AdminSidebar";
import NA from "./NeedAuthentication";
import "./stylesUploadAcademicCalendar.css";
import { getToken} from '../services/LocalStorageService'
import { useGetLoggedUserQuery, useGetAcademicCalendarMutation } from '../services/obesApi'


function UploadAcademicCalendar() {
  
  const {access_token} = getToken();
  const navigate = useNavigate();
  const {data, isSuccess} = useGetLoggedUserQuery(access_token)
  const [userData, setUserData] = useState({
     name: '',
     email: '',
     department: '',
     designation: '',
     userType: '',
     id: '',
     profile_picture:''
  })
  const [getAcademicCalendar] =useGetAcademicCalendarMutation()
  const [academicCalendarList, setAcademicCalendarList] = useState([]);
  
  const [toggle, setToggle] = useState(true);
  const Toggle = () => {
    setToggle(!toggle);
  };
  const handleInput=(event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
  }
  const handleFileInput=(event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.files[0]]}));
  }

  const ValidateTimeSpan = (time_span) => {
    //console.log(time_span)
    const regex = /^\d{4}-\d{4}$/;
    if(regex.test(time_span)) 
    {
      const [start, end] = time_span.split('-').map(Number);
      var x = end - start;
      if(x===1)
      {
        return true;
      }
      else
      {
        alert("Time span must be equal to one year.")
        return false;
      }
    } 
    else
    {
      alert("Time span must be in the format 'XXXX-XXXX' (Starting year - Ending year).")
      return false;
    }
};

  const [values, setValues] = useState({
      time_span: '',
      pdf_file: ''
  })
  const handleSubmit = async(event) => {
    event.preventDefault();
    if(values.time_span[0] && values.pdf_file[0] && ValidateTimeSpan(values.time_span[0]))
    {
      const formData = new FormData();
      formData.append('time_span', values.time_span[0]);
      formData.append('pdf_file', values.pdf_file[0]);
      let axiosConfig = {
          headers: {
            'Content-Type': 'multpart/form-data'
          }
      }
      console.log(formData)
      axios.post('http://127.0.0.1:8000/api/academiccalendar/add-academic-calendar/', formData, axiosConfig).then(
          response =>{
              alert("Academic calendar is uploaded successfully..")
              const form = document.getElementById('uploadACForm');
              if (form) {
                  form.reset();
              }
              GetAcademicCalendarList();
          }
      ).catch(error =>{
          console.log(error)
      })
    }
  };
  const GetAcademicCalendarList= async(event) => {
    const res = await getAcademicCalendar();
    setAcademicCalendarList(res.data);
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
    }
    console.log(data)
    GetAcademicCalendarList();
  }, [data, isSuccess])
  
  return (
    <div className="cntUAC container-fluid">
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
            <div className="cntUAC row min-vh-100">
              <div className="col-2 bg-white">
                <Sidebar name={userData.name} dept={userData.department} designation={userData.designation} profile_picture= {userData.profile_picture}/>
              </div>
              <div className="col-10">
                <div className="px-3">
                  <Nav Toggle={Toggle} name={userData.name} />
                  <div className="container-fluid" id="courseFile">
                    <div className="row g-3 my-2">
                      <div className="col-md-12 p-1">
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content-around rounded">
                          <div className="col-md-12 courseInfo">
                            <p className="fs-2">
                              <strong>Department</strong>: <span>{userData.department}</span>
                            </p>
                          </div>
                        </div>
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content-around part rounded" id="assignment">
                          <p>
                            <label className="fs-2">
                              <strong>Upload Academic Calendar</strong>
                            </label>
                          </p>
                          <div>
                            <div className="card card-body">
                              <form id='uploadACForm' onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="timeSpan" className="form-label infoFormTitle">Time span:</label>
                                    <input className="form-control" name="time_span" type="text" id="timeSpan" onChange={handleInput} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="academicCalendar" className="form-label infoFormTitle">Academic Calendar(.pdf):</label>
                                    <input className="form-control" name="pdf_file" type="file" id="academicCalendar" onChange={handleFileInput} required/>
                                </div>
                                <button type="reset" className="btn btn-secondary">Reset</button>
                                <button type="submit" className="btn btn-success btnSubmit">Submit</button>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content around part rounded" id="acViewer">
                          <p>
                            <label className="fs-2">
                              <strong>Academic Calendar(2023-2024):</strong>
                            </label>
                          </p>
                          <div id="viewAC">
                          <div className='container fluid'>
                            <iframe id="acIframe" src="../Academic Calendar.pdf#zoom=100" width="100%" height="995px" title="PDF Viewer"></iframe>
                            </div>
                          </div>
                        </div>
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content around part rounded" id="archive">
                          <p>
                            <label className="fs-2">
                              <strong>Archive:</strong>
                            </label>
                            <div className="row g-3 my-2">
                              <table className="table table-responsive-sm table-striped table-bordered bg-white text-center">
                                <thead>
                                  <tr>
                                    <th scope="col"><strong className='fs-5'>#</strong></th>
                                    <th scope="col"><strong className='fs-5'>Academic Calendar</strong></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {academicCalendarList.slice(0, academicCalendarList.length).map((calendar,index) => {
                                    return (
                                      <tr>
                                          <td><strong>{index+1}</strong></td>
                                          <td><a href={`http://127.0.0.1:8000/${calendar.pdf_file}`} target="_blank"><strong className='fs-4'>{calendar.time_span}</strong></a></td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row g-3 my-2"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!toggle && (
            <div className="cntUAC min-vh-100">
              <div className="px-3">
                  <Nav Toggle={Toggle} name={userData.name} />
                  <div className="container-fluid" id="courseFile">
                    <div className="row g-3 my-2">
                      <div className="col-md-12 p-1">
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content-around rounded">
                          <div className="col-md-12 courseInfo">
                            <p className="fs-2">
                              <strong>Department</strong>: <span>{userData.department}</span>
                            </p>
                          </div>
                        </div>
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content-around part rounded" id="assignment">
                          <p>
                            <label className="fs-2">
                              <strong>Upload Academic Calendar</strong>
                            </label>
                          </p>
                          <div>
                            <div className="card card-body">
                              <form id='uploadACForm' onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="timeSpan" className="form-label infoFormTitle">Time span:</label>
                                    <input className="form-control" name="time_span" type="text" id="timeSpan" onChange={handleInput} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="academicCalendar" className="form-label infoFormTitle">Academic Calendar(.pdf):</label>
                                    <input className="form-control" name="pdf_file" type="file" id="academicCalendar" onChange={handleFileInput} required/>
                                </div>
                                <button type="reset" className="btn btn-secondary">Reset</button>
                                <button type="submit" className="btn btn-success btnSubmit">Submit</button>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content around part rounded" id="acViewer">
                          <p>
                            <label className="fs-2">
                              <strong>Academic Calendar(2023-2024):</strong>
                            </label>
                          </p>
                          <div id="viewAC">
                          <div className='container fluid'>
                            <iframe id="acIframe" src="../Academic Calendar.pdf#zoom=100" width="100%" height="995px" title="PDF Viewer"></iframe>
                            </div>
                          </div>
                        </div>
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content around part rounded" id="archive">
                          <p>
                            <label className="fs-2">
                              <strong>Archive:</strong>
                            </label>
                            <div className="row g-3 my-2">
                              <table className="table table-responsive-sm table-striped table-bordered bg-white text-center">
                                <thead>
                                  <tr>
                                    <th scope="col"><strong className='fs-5'>#</strong></th>
                                    <th scope="col"><strong className='fs-5'>Academic Calendar</strong></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {academicCalendarList.slice(0, academicCalendarList.length).map((calendar,index) => {
                                    return (
                                      <tr>
                                          <td><strong>{index+1}</strong></td>
                                          <td><a href={`http://127.0.0.1:8000/${calendar.pdf_file}`} target="_blank"><strong className='fs-4'>{calendar.time_span}</strong></a></td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row g-3 my-2"></div>
                  </div>
                </div>
            </div>
          )}
        </div>
      }
      
    </div>
  );
}

export default UploadAcademicCalendar;
