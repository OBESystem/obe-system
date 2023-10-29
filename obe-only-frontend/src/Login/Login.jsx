import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesLogin.css';
import Validation from './LoginValidation';
import axios from 'axios';
import Footer from '../MainComponents/Footer';
import NavHome from '../MainComponents/NavHome';

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

    axios.defaults.withCredentials = true;
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
          alert("Successful....");
          navigate('/TeacherDashboard', { state: { yourData: values } });
        }
      }
    }

   return (
    <div id="lgIn">
      <NavHome title={"Log in"}/>
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
                      <div className="col-11"><label class="text-login-type" htmlFor="department">Department Admin</label></div>
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
        <Footer/>
      </div>
    </div>
  );
}

export default Login;
