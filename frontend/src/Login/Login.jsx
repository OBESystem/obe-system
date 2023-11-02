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
        password: ''
    })
    const [tId, setTId] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInput=(event) => {
      setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
    }

    axios.defaults.withCredentials = true;
    const handleSubmit=(event) => {
      event.preventDefault();
      setErrors(Validation(values));
      if(errors.email === "" && errors.password === "")
      {
    
        axios.post('http://localhost:7000/Login', values)
        .then(res => {
          if(res.data === "Incorrect email!!")
          {
            alert("Incorrect email!!");
          }
          else if(res.data === "Incorrect password!!")
          {
            alert(res.data);
          }
          else if(res.data === "Error")
          {
            alert(res.data);
          }
          else
          {
            var type=res.data;
            console.log(type);
            if(type === '0')
            {
              alert("Successful....");
              navigate('/Welcome');
            }
            else if(type === '1')
            {
              alert("Successful....");
              navigate('/TeacherDashboard', { state: { email: values.email } });
            }
            else
            {
              alert("Successful....");
              navigate('/AcademicCalendar');
            }
          }
        })
        .catch(err => console.log(err))
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
