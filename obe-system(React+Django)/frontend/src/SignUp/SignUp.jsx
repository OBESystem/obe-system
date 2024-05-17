import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './stylesSignUp.css';
import NavHome from '../MainComponents/NavHome';
import { getToken} from '../services/LocalStorageService'
import { setUserToken} from '../features/authSlice';
import { useDispatch } from 'react-redux';
function SignUp() {
  const [values, setValues] = useState({
    name: '',
    department: '',
    designation: '',
    email: '',
    phoneNumber: '',
    profile_picture: '',
    password: '',
    password2:''
  })

const dispatch = useDispatch()
const navigate = useNavigate();
const [serverErrors, setServerErrors] = useState({});

const handleInput=(event) => {
  setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
}

const handleFileInput=(event) => {
  setValues(prev => ({...prev, [event.target.name]: [event.target.files[0]]}));
}
const handleReset=(event) => {
  setServerErrors({
    name:'',
    department: '',
    designation: '',
    email: '',
    phoneNumber: '',
    profile_picture: '',
    password: '',
    password2: ''
  });
  setValues({
    name: '',
    department: '',
    designation: '',
    email: '',
    phoneNumber: '',
    profile_picture: '',
    password: '',
    password2:''
  });
}

const handleSubmit= async(event) => {
  setServerErrors({
    name:'',
    department: '',
    designation: '',
    email: '',
    phoneNumber: '',
    profile_picture: '',
    password: '',
    password2: ''
  });
  event.preventDefault();
  const formData = new FormData();
  formData.append('name', values.name);
  formData.append('email', values.email);
  formData.append('department', values.department);
  formData.append('designation', values.designation);
  formData.append('phoneNumber', values.phoneNumber);
  formData.append('password', values.password);
  formData.append('password2', values.password2);
  //console.log('--------------------------------------------')
  if(values.profile_picture[0])
  {
    formData.append('profile_picture', values.profile_picture[0]);
   // console.log(formData.get('profile_picture'))
  }
  let axiosConfig = {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  }
  //console.log(formData)
  axios.post('http://127.0.0.1:8000/api/user/register/', formData, axiosConfig).then(
      response =>{
          //console.log('Successfully created the account..')
          let {access_token} = getToken()
          dispatch(setUserToken({access_token: access_token}))
          navigate('/Welcome');
      }
    ).catch(error =>{
        //console.log(error)
      setServerErrors(error.response.data.errors)
      if(!values.profile_picture[0])
      {
        setServerErrors(prev => ({...prev, profile_picture: ''}));
      }
    }
  )
}

let {access_token} = getToken()
useEffect(() => {
    dispatch(setUserToken({access_token: access_token}))
}, [access_token, dispatch])

return (
  <div id="snUp" className="min-vh-100">
    <NavHome title={"Sign up"}/>
    <div className="container-fluid ">
    <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
        <form id="signUp-form" className="row g-3" action="" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-3"></div>
              <div className="col-6">
                <div className="row inputDiv">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className={`form-control ${serverErrors.name ? 'is-invalid' : ''}`} id="name" name="name" onChange={handleInput}/>
                  {serverErrors.name && (
                    <div className="invalid-feedback">
                      {serverErrors.name}
                    </div>
                  )}
                </div>
                <div className="row inputDiv">
                  <label htmlFor="department" className="form-label">Department</label>
                  <select className={`form-control form-select signUpSelectInput ${serverErrors.department ? 'is-invalid' : ''}`} id="department" name="department" onChange={handleInput} >
                    <option selected>Select Department</option>
                    <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Statistics">Statistics</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="English">English</option>
                    <option value="Exam Control Office">Exam Control Office</option>
                  </select>
                  {serverErrors.department && (
                    <div className="invalid-feedback">
                      {serverErrors.department}
                    </div>
                  )}
                </div>
                <div className="row inputDiv">
                  <label htmlFor="designation" className="form-label">Designation</label>
                  <select className={`form-control form-select signUpSelectInput ${serverErrors.designation ? 'is-invalid' : ''}`} id="designation" name="designation" onChange={handleInput} >
                    <option selected>Select Designation</option>
                    <option value="Employee">Employee</option>
                    <option value="Lecturer">Lecturer</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Professor">Professor</option>
                  </select>
                  {serverErrors.designation && (
                    <div className="invalid-feedback">
                      {serverErrors.designation}
                    </div>
                  )}
                </div>
                <div className="row inputDiv">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="text" className={`form-control ${serverErrors.email ? 'is-invalid' : ''}`} id="email" name="email" placeholder="example@gmail.com" onChange={handleInput}/>
                  {serverErrors.email && (
                    <div className="invalid-feedback">
                      {serverErrors.email}
                    </div>
                  )}
                </div>
                <div className="row inputDiv">
                  <label htmlFor="phoneNumber" className="form-label">Phone number</label>
                  <input type="text" className={`form-control ${serverErrors.phoneNumber ? 'is-invalid' : ''}`} id="phoneNumber" name="phoneNumber" onChange={handleInput}/>
                  {serverErrors.phoneNumber && (
                    <div className="invalid-feedback">
                      {serverErrors.phoneNumber}
                    </div>
                  )}
                </div>
                <div className="row inputDiv">
                  <label htmlFor="profile_picture" className="form-label">Profile picture<label id="ppSizeLabel">(216px X 216px)</label></label>
                  <input type="file" className={`form-control ${serverErrors.profile_picture ? 'is-invalid' : ''}`} id="profile_picture" name="profile_picture" onChange={handleFileInput}/>
                  {serverErrors.profile_picture && (
                    <div className="invalid-feedback">
                      {serverErrors.profile_picture}
                    </div>
                  )}
                </div>
                <div className="row inputDiv">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className={`form-control ${serverErrors.password ? 'is-invalid' : ''}`} id="password" name="password" onChange={handleInput}/>
                  {serverErrors.password && (
                    <div className="invalid-feedback">
                      {serverErrors.password}
                    </div>
                  )}
                </div>
                <div className="row inputDiv">
                  <label htmlFor="password2" className="form-label">Confirm Password</label>
                  <input type="password" className={`form-control ${serverErrors.password2 ? 'is-invalid' : ''}`} id="password2" name="password2" onChange={handleInput}/>
                  {serverErrors.password2 && (
                    <div className="invalid-feedback">
                      {serverErrors.password2}
                    </div>
                  )}
                </div>
                {serverErrors.non_field_errors && (
                    <div className="row inputDiv">
                      <div className="form-check">
                        <label className="form-check-label text-danger fs-6">{serverErrors.non_field_errors[0]}!!</label>
                      </div>
                  </div>
                )}
                <div className="row bn">
                  <button type="reset" className="buttons" id="reset" onChange={handleReset}>Reset</button>
                  <button type="submit" className="buttons" id="submit">Submit</button>
                </div>
              </div>
              <div className="col-3"></div>
            </div>
          </form>
        </div>

        <div className="col-3"></div>
      </div>
      <div className="row" id="footerSU">
          <div className="col-1"></div>
          <div className="col-10">
              <div id="line"></div>
              Jahangirnagar University, Savar, Dhaka-1342. Telephone: PABX:02224491045-51,<br />Fax:02224491952
          </div>
          <div className="col-1"></div>
      </div>
    </div>
  </div>
);
}

export default SignUp;