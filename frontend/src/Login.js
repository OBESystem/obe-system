import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesLogin.css';
import LOGO from './LOGO.png';
import Validation from './LoginValidation';
import axios from 'axios';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        loginType: ''
    })
    
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInput=(event) => {
      setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
    }

    const handleSubmit=(event) => {
      event.preventDefault();
      setErrors(Validation(values));
      if(errors.email === "" && errors.password === "" && errors.loginType === "")
      {
        var type = JSON.stringify(errors.type);
        var l = type.length;
        type = type.slice(2, l -2);
        if(type === "teacher")
        {
           axios.post('http://localhost:7000/Login', values)
          .then(res => {
            if(res.data === "Incorrect email!!")
            {
              alert("Incorrect email!!");
            }
            else if(res.data === "Successful..")
            {
              alert("Successful....");
              navigate('/TeacherDashboard');
            }
            else
            {
              alert(res.data);
            }
          })
         .catch(err => console.log(err))
        }
      }
    }

   return (
    <div>
       <div id="header">
          <img id="logo" src={LOGO} alt="JU Logo" />
          <h1 id="title">Log-in</h1>
        </div>

        <form id="login-form" action="" onSubmit={handleSubmit}>
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

          <label className="text">Login as: </label><br />
          <input type="radio" name="loginType" value="teacher" id="teacher" onChange={handleInput}/>
          <label className="text-login-type" htmlFor="teacher">
            Teacher
          </label><br />
          <input type="radio" name="loginType" value="department" />
          <label className="text-login-type" htmlFor="department">
            Department
          </label><br />
          <input type="radio" name="loginType" value="examControllerOffice" />
          <label className="text-login-type" htmlFor="examControllerOffice">
            Exam Controller Office
          </label><br />
          {errors.loginType && <label className="err">{errors.loginType}</label>}<br/>

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

export default Login;
