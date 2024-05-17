import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesLogin.css';
import Footer from '../MainComponents/Footer';
import NavHome from '../MainComponents/NavHome';
import {useSendPasswordResetEmailMutation} from '../services/obesApi'

function SendEmailResetPassword() {
    const [values, setValues] = useState({
        email: '',
        success: 'Password reset email is sent. Check your Email!! \n Redirecting to Home..'
    })
  
    const [serverErrors, setServerErrors] = useState({});
    const [serverMsg, setServerMsg] = useState({});
    const [sendPasswordResetEmail, {isLoading}] = useSendPasswordResetEmailMutation();
    const navigate = useNavigate();

    const handleInput=(event) => {
      setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
    }

    const handleReset=() => {
      setServerErrors({});
      setServerMsg({})
    }
    
    const handleSubmit= async(event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const actualData = {
        email: data.get('email'),
      }
      
      const res = await sendPasswordResetEmail(actualData);
      if(res.error)
      {
        //console.log(res.error.data.errors)
        setServerErrors(res.error.data.errors)
        setServerMsg({})
      }
      if(res.data)
      {
        //console.log(res.data)
        setServerMsg(res.data)
        setServerErrors({})
        setTimeout(() => {
          navigate("/")
        }, 5000)
      }
    }

    return (
      <div id="lgIn" className="min-vh-100">
        <NavHome title={"Request link to Reset Password"}/>
        <div className="container-fluid">
        <div className="row">
            <div className="col-3"></div>
            
            <div className="col-6">
              <form id="login-form" action="" className="row g-3" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-3"></div>
                  <div className="col-6">
                  <div className="row inputDiv">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className={`form-control ${serverErrors.email ? 'is-invalid' : ''}`} id="email" name="email" placeholder="example@gmail.com" onChange={handleInput}/>
                    {serverErrors.email && (
                      <div className="invalid-feedback">
                        {serverErrors.email}
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
                  {serverMsg.msg && (
                        <div className="row inputDiv text-center">
                          <div className="form-check">
                            <label className="form-check-label text-success fs-6">{values.success}</label>
                          </div>
                      </div>
                    )}
                  {isLoading ? 
                    <div className="text-center">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>: 
                  null}
                  {!isLoading ? 
                    <div className="row bn">
                      <button type="reset" className="buttons" id="reset" onClick={handleReset}>Reset</button>
                      <button type="submit" className="buttons" id="submit">Send</button>
                    </div> : 
                    <div className="row bn">
                      <button type="reset" className="disabledBtn" id="reset" disabled>Reset</button>
                      <button type="submit" className="disabledBtn" id="submit" disabled>Send</button>
                    </div>}
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

export default SendEmailResetPassword;
//isLoading part(video 1:09:27)