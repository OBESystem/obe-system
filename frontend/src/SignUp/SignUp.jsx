import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesSignUp.css';
import Validation from './SignUpValidation';
import NavHome from '../MainComponents/NavHome';
import Footer from '../MainComponents/Footer';
import axios from 'axios';

function SignUp() {
  const [values, setValues] = useState({
    name: '',
    dept: '',
    email: '',
    phoneNumber: '',
    password: ''
})

const navigate = useNavigate();
const [errors, setErrors] = useState({});

const handleInput=(event) => {
  setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
}

const handleSubmit=(event) => {
  event.preventDefault();
  setErrors(Validation(values));
  if(errors.name === "" && errors.dept === "" && errors.email === "" && errors.phoneNumber === "" && errors.password === "")
  {
    axios.post('http://localhost:7000/SignUp', values)
    .then(res => {
      navigate('/Welcome');
    })
    .catch(err => console.log(err))
  }
}

return (
  <div id="snUp">
    <NavHome title={"Sign up"}/>
    <div className="container-fluid">
    <div className="row">
        <div className="col-3"></div>
        
        <div className="col-6">
        <form id="signUp-form" action="" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-3"></div>
              <div className="col-6">
              <div className="row" id="inpt1">
                <div className="col-5 text-left">
                  <label htmlFor="name">Name:</label>
                </div>
                <div className="col-7">
                  <input type="text" id="name" name="name" onChange={handleInput}/>
                </div>
                {errors.name && <label className="err">{errors.name}</label>}
              </div>
              <div className="row" id="inpt2">
                <div className="col-5 text-left">
                  <label htmlFor="dept">Department:</label>
                </div>
                <div className="col-7">
                <input type="text" id="dept" name="dept" onChange={handleInput}/><br />
                </div>
                {errors.dept && <label className="err">{errors.dept}</label>}
              </div>
              <div className="row" id="inpt3">
                <div className="col-5 text-left">
                  <label htmlFor="dept">Designation:</label>
                </div>
                <div className="col-7">
                <input type="text" id="designation" name="designation" onChange={handleInput}/><br />
                </div>
                {errors.designation && <label className="err">{errors.designation}</label>}
              </div>
              <div className="row" id="inpt4">
                <div className="col-5 text-left">
                  <label htmlFor="email">E-mail:</label>
                </div>
                <div className="col-7">
                  <input type="text" id="email" name="email" placeholder="example@gmail.com" onChange={handleInput}/><br />
                </div>
                {errors.email && <label className="err">{errors.email}</label>}
              </div>
              <div className="row" id="inpt5">
                <div className="col-5 text-left">
                  <label htmlFor="phoneNumber">Phone number:</label>
                </div>
                <div className="col-7">
                  <input type="text" id="phoneNumber" name="phoneNumber" onChange={handleInput}/><br />
                </div>
                {errors.phoneNumber && <label className="err">{errors.phoneNumber}</label>}
              </div>
              <div className="row" id="inpt6">
                <div className="col-5 text-left">
                  <label htmlFor="password">Password:</label>
                </div>
                <div className="col-7"><input type="password" id="password" name="password" onChange={handleInput}/><br /></div>
                {errors.password && <label className="err">{errors.password}</label>}
              </div>
              <div className="row" id="inpt7">
                <div className="col-5 text-left">
                  <label htmlFor="confirmPassword">Confirm password:</label>
                </div>
                <div className="col-7"><input type="password" id="confirmPassword" name="confirmPassword" onChange={handleInput}/><br /></div>
                {errors.confirmPassword && <label className="err">{errors.confirmPassword}</label>}
              </div>
              <div className="row bn">
                <div className="col-6 text-center"><button type="reset" class="buttons" id="reset">Reset</button></div>
                <div className="col-6 text-center"><button type="submit" class="buttons" id="submit">Submit</button></div>
              </div>
          </div>
              <div className="col-3"></div>
            </div>
          </form>
        </div>

        <div className="col-3"></div>
      </div>
      <Footer/>
    </div>
  </div>
);
}

export default SignUp;