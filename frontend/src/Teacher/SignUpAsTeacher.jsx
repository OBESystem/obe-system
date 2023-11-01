import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesSAT.css';
import Validation from './SATValidation';
import Footer from '../MainComponents/Footer';
import NavHome from '../MainComponents/NavHome';
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
  <div id="snUpT">
    <NavHome title={"Sign up as Teacher"}/>
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
                  <label htmlFor="name">Enter name:</label>
                </div>
                <div className="col-7">
                  <input type="text" id="name" name="name" onChange={handleInput}/>
                </div>
                {errors.name && <label className="err">{errors.name}</label>}
              </div>
              <div className="row" id="inpt2">
                <div className="col-5 text-left">
                  <label htmlFor="dept">Enter department:</label>
                </div>
                <div className="col-7">
                <input type="text" id="dept" name="dept" onChange={handleInput}/><br />
                </div>
                {errors.dept && <label className="err">{errors.dept}</label>}
              </div>
              <div className="row" id="inpt3">
                <div className="col-5 text-left">
                  <label htmlFor="id">Enter Identification ID:</label>
                </div>
                <div className="col-7">
                  <input type="text" id="id" name="id" onChange={handleInput}/><br />
                </div>
                {errors.id && <label className="err">{errors.id}</label>}
              </div>
              <div className="row" id="inpt4">
                <div className="col-5 text-left">
                  <label htmlFor="email">Enter e-mail:</label>
                </div>
                <div className="col-7">
                  <input type="text" id="email" name="email" placeholder="example@gmail.com" onChange={handleInput}/><br />
                </div>
                {errors.email && <label className="err">{errors.email}</label>}
              </div>
              <div className="row" id="inpt5">
                <div className="col-5 text-left">
                  <label htmlFor="password">Enter password:</label>
                </div>
                <div className="col-7"><input type="password" id="password" name="password" onChange={handleInput}/><br /></div>
                {errors.password && <label className="err">{errors.password}</label>}
              </div>
              <div className="row" id="inpt6">
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

export default SignUpAsTeacher;