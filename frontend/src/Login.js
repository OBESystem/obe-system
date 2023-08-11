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
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <img className="navbar-brand" id="logo1" src={LOGO} alt="Logo" />
          <h1 className="navbar-brand-center" id="title">Log-in</h1>
        </div>
      </nav>
      
      <div className="container-fluid">
        
      <div className="row">
          <div className="col-3"></div>
          
          <div className="col-6">
            <form id="login-form" action="" onSubmit={handleSubmit}>
            
              <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                <div className="row" id="inpt1">
                  <div className="col-5 text-left">
                    <label htmlFor="email">Enter e-mail:</label>
                  </div>
                  <div className="col-7">
                    <input type="text" id="email" name="email" placeholder="example@gmail.com" onChange={handleInput}/><br />
                  </div>
                  {errors.email && <label className="err">{errors.email}</label>}
                </div>
                <div className="row" id="inpt2">
                  <div className="col-5 text-left">
                    <label htmlFor="password">Enter password:</label>
                  </div>
                  <div className="col-7"><input type="password" id="password" name="password" onChange={handleInput}/><br /></div>
                  {errors.password && <label className="err">{errors.password}</label>}
                </div>
                <div className="row" id="inpt3">
                  <div className="col-12">
                    <div className="row lTitle"><label class="text-left">Login as: </label></div>
                    <div className="row">
                      <div className="col-1">
                        <input type="radio" name="loginType" value="teacher" onChange={handleInput}/>
                      </div>
                      <div className="col-11"><label class="text-login-type" htmlFor="teacher">Teacher</label></div>
                    </div>
                    <div className="row">
                      <div className="col-1">
                        <input type="radio" name="loginType" value="department" />
                      </div>
                      <div className="col-11"><label class="text-login-type" htmlFor="department">Department</label></div>
                    </div>
                    <div className="row">
                      <div className="col-1">
                        <input type="radio" name="loginType" value="examControllerOffice" />
                      </div>
                      <div className="col-11"><label class="text-login-type" htmlFor="examControllerOffice">Exam Controller Office</label></div>
                    </div>
                  </div>
                  {errors.loginType && <label class="err">{errors.loginType}</label>}
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

        <div className="row" id="footer">
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

export default Login;
