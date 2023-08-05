import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesSAT.css';
import LOGO from './LOGO.png';
import Validation from './SATValidation';
import axios from 'axios';

function SignUpAsTeacher() {
  const [values, setValues] = useState({
    name: '',
    dept: '',
    id: '',
    email: '',
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
  if(errors.name === "" && errors.dept === "" && errors.id === "" && errors.email === "" && errors.password === "")
  {
    axios.post('http://localhost:7000/SignUpAsTeacher', values)
    .then(res => {
      navigate('/Login');
    })
    .catch(err => console.log(err))
  }
}

  return (
    <div>
      <div id="header">
          <img id="logo" src={LOGO} alt="JU Logo" />
          <h1 id="title">Sign Up As Teacher</h1>
        </div>
        <form id="signUp-form" action="" onSubmit={handleSubmit}>
          <label className="text" htmlFor="name">
            Enter name:
          </label>
          <input type="text" id="name" name="name" onChange={handleInput}/><br />
          {errors.name && <label className="err">{errors.name}</label>}<br/>

          <label className="text" htmlFor="dept">
            Enter department:
          </label>
          <input type="text" id="dept" name="dept" onChange={handleInput}/><br />
          {errors.dept && <label className="err">{errors.dept}</label>}<br/>

          <label className="text" htmlFor="id">
            Enter Identification ID:
          </label>
          <input type="text" id="id" name="id" onChange={handleInput}/><br />
          {errors.id && <label className="err">{errors.id}</label>}<br/>
          <label className="text" htmlFor="email">
            Enter e-mail:
          </label>
          <input type="text" id="email" name="email" placeholder="example@gmail.com" onChange={handleInput}/><br />
          {errors.email && <label className="err">{errors.email}</label>}<br/>
          
          <label className="text" htmlFor="password">
            Enter password:
          </label>
          <input type="password" id="password" name="password" onChange={handleInput}/><br />
          {errors.password && <label className="err">{errors.password}</label>}<br/>

          <label className="text" htmlFor="confirmPassword">
            Confirm password:
          </label>
          <input type="password" id="confirmPassword" name="confirmPassword" onChange={handleInput}/><br />
          {errors.confirmPassword && <label className="err">{errors.confirmPassword}</label>}<br/>

          <button type="reset" className="buttons" id="reset">
            Reset
          </button>
          <button type="submit" className="buttons" id="submit">
            Submit
          </button>
        </form>
        <div id="footer">
          <hr className="line" />
          Jahangirnagar University, Savar, Dhaka-1342. Telephone: PABX:02224491045-51,
          <br />
          Fax:02224491952
        </div>
    </div>
  );
}

export default SignUpAsTeacher;