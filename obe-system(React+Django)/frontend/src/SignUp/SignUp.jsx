import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesSignUp.css';
import NavHome from '../MainComponents/NavHome';
import { useRegisterUserMutation } from '../services/obesApi'
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
    password: '',
    password2:''
})

const dispatch = useDispatch()
const navigate = useNavigate();
const [registerUser, {isLoading}] = useRegisterUserMutation()
const [serverErrors, setServerErrors] = useState({});

const handleInput=(event) => {
  setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
}
const handleReset=(event) => {
  setServerErrors({
    name:'',
    department: '',
    designation: '',
    email: '',
    phoneNumber: '',
    password: '',
    password2: ''
  });
}

const handleSubmit= async(event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const actualData = {
    name: data.get('name'),
    department: data.get('department'),
    designation: data.get('designation'),
    email: data.get('email'),
    phoneNumber: data.get('phoneNumber'),
    password: data.get('password'),
    password2: data.get('password2')
  }
  const res = await registerUser(actualData);
  if(res.error)
  {
    console.log(res.error.data.errors)
    setServerErrors(res.error.data.errors)
  }
  if(res.data)
  {
    console.log(res.data)
    let {access_token} = getToken()
    dispatch(setUserToken({access_token: access_token}))
    navigate('/Welcome');
  }
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
                  <input type="text" className={`form-control ${serverErrors.department ? 'is-invalid' : ''}`} id="department" name="department" onChange={handleInput}/>
                  {serverErrors.department && (
                    <div className="invalid-feedback">
                      {serverErrors.department}
                    </div>
                  )}
                </div>
                <div className="row inputDiv">
                  <label htmlFor="designation" className="form-label">Designation</label>
                  <input type="text" className={`form-control ${serverErrors.designation ? 'is-invalid' : ''}`} id="designation" name="designation" onChange={handleInput}/>
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