import React, {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './stylesLogin.css';
import Footer from '../MainComponents/Footer';
import NavHome from '../MainComponents/NavHome';
import { useResetPasswordMutation} from '../services/obesApi'

function ResetPassword() {
    const [values, setValues] = useState({
        password: '',
        password2: '',
        success: 'Password reset successfully!!\n Redirecting to Login page...'
    })
   
    const [serverErrors, setServerErrors] = useState({});
    const [serverMsg, setServerMsg] = useState({});
    const [resetPassword] = useResetPasswordMutation();
    const {id, token} = useParams();
    const navigate = useNavigate();

    const handleInput=(event) => {
      setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
    }

    const handleReset=(event) => {
      setServerErrors({password: '', password2: ''});
    }

   
    const handleSubmit= async(event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const actualData = {
        password: data.get('password'),
        password2: data.get('password2'),
      }
      
      const res = await resetPassword({actualData, id, token});
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
          navigate("/Login")
        }, 3000)
      }
    }

    return (
      <div id="lgIn" className="min-vh-100">
        <NavHome title={"Reset Password"}/>
        <div className="container-fluid">
        <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              <form id="login-form" action="" className="row g-3" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-3"></div>
                  <div className="col-6">
                  <div className="row inputDiv">
                    <label htmlFor="password" className="form-label">New Password</label>
                    <input type="password" className={`form-control ${serverErrors.password ? 'is-invalid' : ''}`} id="password" name="password" onChange={handleInput}/>
                    {serverErrors.password && (
                      <div className="invalid-feedback">
                        {serverErrors.password}
                      </div>
                    )}
                  </div>
                  <div className="row inputDiv">
                    <label htmlFor="password2" className="form-label">Confirm New Password</label>
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
                   {serverMsg.msg && (
                        <div className="row inputDiv">
                          <div className="form-check">
                            <label className="form-check-label text-success fs-6">{values.success}</label>
                          </div>
                      </div>
                    )}
                  <div className="row bn">
                    <button type="reset" class="buttons" id="reset" onClick={handleReset}>Reset</button>
                    <button type="submit" class="buttons" id="submit">Save</button>
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

export default ResetPassword;
