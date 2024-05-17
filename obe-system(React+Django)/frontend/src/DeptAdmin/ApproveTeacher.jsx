import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./NavAdmin";
import Sidebar from "./AdminSidebar";
import NA from "./NeedAuthentication";
import "./stylesApproveTeacher.css";
import { getToken} from '../services/LocalStorageService'
import { useGetLoggedUserQuery, useGetUnapprovedTeachersMutation, useAddTeacherMutation, useApproveUserMutation, useRejectUserMutation} from '../services/obesApi'

function ApproveTeacher() {
  const [toggle, setToggle] = useState(true);
  const {access_token} = getToken();
  const navigate = useNavigate();
  const [showTeacherList, setShowTeacherList] = useState(false);
  const {data, isSuccess} = useGetLoggedUserQuery(access_token);
  const [getUnapprovedTeachers] = useGetUnapprovedTeachersMutation();
  const [addTeacher] = useAddTeacherMutation();
  const [approveUser] = useApproveUserMutation();
  const [rejectUser] = useRejectUserMutation()
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

  const [teacherInfo, setTeacherInfo] = useState([]);

  const GetTeacherInfo = async(event) => {
    const res = await getUnapprovedTeachers({department : userData.department, userType: '0'});
    //console.log(res.data)
    setTeacherInfo(res.data)
  };

  const AddTeacher = async(index) => {
    const actualData = {
      user: teacherInfo[index].id,
      id: teacherInfo[index].id,
    }
    const res1 = await addTeacher(actualData);
    const res2 = await approveUser(actualData);
    if(!res1.error && !res2.error)
    {
      alert("Teacher is approved..")
      GetTeacherInfo();
    }
  };

  const RemoveTeacher = async(index) => {
    const actualData = {
      id: teacherInfo[index].id,
    }
    const res = await rejectUser(actualData);
    if(!res.error)
    {
      alert("Teacher is rejected..")
      GetTeacherInfo();
    }
  };

  return (
    <div className="cntAppTe container-fluid">
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
            <div className="cntAppTe row min-vh-100">
              <div className="col-2 bg-white">
                <Sidebar name={userData.name} dept={userData.department} designation={userData.designation} profile_picture= {userData.profile_picture} />
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
                            <p className="fs-3">
                              <strong>Approve Unapproved Teacher Account</strong>
                            </p>
                          </div>
                        </div>
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content-around part rounded" id="assignment">
                          <p>
                            <button className="btn btn-primary btn-outline-light lButton"
                              onClick={() => {
                                setShowTeacherList(!showTeacherList);
                                GetTeacherInfo();
                              }} >Show Unapproved Teacher Accounts</button>
                          </p>
                          <div>
                            {showTeacherList && (
                              <div className="row g-3 my-2">
                                <strong>
                                  <span className="fs-3">List of courses:</span>
                                </strong>
                                <div className="teacherTableForApproval">
                                  <table className="table table-responsive-sm table-striped table-bordered bg-white text-center">
                                    <thead>
                                      <tr>
                                        <th scope="col">User ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Designation</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">PhoneNumber</th>
                                        <th scope="col">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {teacherInfo
                                        .slice(0, teacherInfo.length)
                                        .map((teacher, index) => {
                                          return (
                                            <tr>
                                              <td>{teacher.id}</td>
                                              <td>{teacher.name}</td>
                                              <td>{teacher.designation}</td>
                                              <td>{teacher.email}</td>
                                              <td>{teacher.phoneNumber}</td>
                                              <td>
                                              <button className="btn btn-success"
                                              onClick={() => {
                                                AddTeacher(index);
                                              }}
                                              >Approve</button>&nbsp;
                                              <button className="btn btn-danger"
                                              onClick={() => {
                                                RemoveTeacher(index);
                                              }}
                                              >Reject</button>
                                            </td>
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
                    <div className="row g-3 my-2"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!toggle && (
            <div className="cntAppTe min-vh-100.">
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
                            <p className="fs-3">
                              <strong>Approve Unapproved Teacher Account</strong>
                            </p>
                          </div>
                        </div>
                        <div className="row p-3 bg-white shadow-sm d-flex justify-content-around part rounded" id="assignment">
                          <p>
                            <button className="btn btn-primary btn-outline-light lButton"
                              onClick={() => {
                                setShowTeacherList(!showTeacherList);
                                GetTeacherInfo();
                              }} >Show Unapproved Teacher Accounts</button>
                          </p>
                          <div>
                            {showTeacherList && (
                              <div className="row g-3 my-2">
                                <strong>
                                  <span className="fs-3">List of courses:</span>
                                </strong>
                                <div className="teacherTableForApproval">
                                  <table className="table table-responsive-sm table-striped table-bordered bg-white text-center">
                                    <thead>
                                      <tr>
                                        <th scope="col">User ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Designation</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">PhoneNumber</th>
                                        <th scope="col">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {teacherInfo
                                        .slice(0, teacherInfo.length)
                                        .map((teacher, index) => {
                                          return (
                                            <tr>
                                              <td>{teacher.user_id}</td>
                                              <td>{teacher.name}</td>
                                              <td>{teacher.designation}</td>
                                              <td>{teacher.email}</td>
                                              <td>{teacher.phoneNumber}</td>
                                              <td>
                                              <button className="btn btn-success"
                                              onClick={() => {
                                                AddTeacher(index);
                                              }}
                                              >Approve</button>&nbsp;
                                              <button className="btn btn-danger"
                                              onClick={() => {
                                                RemoveTeacher(index);
                                              }}
                                              >Reject</button>
                                            </td>
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

export default ApproveTeacher;
