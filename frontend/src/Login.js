import React, {useState} from 'react';
import './stylesLogin.css';
import LOGO from './LOGO.png';
import Validation from './LoginValidation';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    
    const [errors, setErrors] = useState({});

    const handleInput=(event) => {
      setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
    }

    const handleSubmit=(event) => {
      event.preventDefault();
      setErrors(Validation(values));
    }

   return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" type="text/css" href="stylesLogin.css" />
        <title>Log-in</title>
      </head>
      <body>
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
          <input type="radio" name="login-type" value="teacher" id="teacher" checked />
          <label className="text-login-type" htmlFor="teacher">
            Teacher
          </label><br />
          <input type="radio" name="login-type" value="department" />
          <label className="text-login-type" htmlFor="department">
            Department
          </label><br />
          <input type="radio" name="login-type" value="examControllerOffice" />
          <label className="text-login-type" htmlFor="examControllerOffice">
            Exam Controller Office
          </label><br />

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
      </body>
    </html>
  );
}

export default Login;
