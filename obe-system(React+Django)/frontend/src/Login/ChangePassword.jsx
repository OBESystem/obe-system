import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesLogin.css';
import NA from '../Teacher/NeedAuthentication';
import Footer from '../MainComponents/Footer';
import NavHome from '../MainComponents/NavHome';
import {getToken} from '../services/LocalStorageService'
import {useChangePasswordMutation} from '../services/obesApi'


function ChangePassword() {
    const [values, setValues] = useState({
        password: '',
        password2: '',
        success: 'Password is changed successfully!!\n Redirecting to Login page...'
    })

    const [serverErrors, setServerErrors] = useState({});
    const [serverMsg, setServerMsg] = useState({});
    const [changePassword] = useChangePasswordMutation();
    const {access_token} = getToken();
    const navigate = useNavigate();

    const handleInput=(event) => {
      setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
    }

    const handleReset=(event) => {
      setServerErrors({password: '', confirmPassword: ''});
    }

   
    const handleSubmit= async(event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const actualData = {
        password: data.get('password'),
        password2: data.get('password2')
      }
      
      const res = await changePassword({actualData, access_token});
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
        }, 3000)
      }
    }

    return (
      <div id="lgIn" className="min-vh-100">
         {!access_token ? 
          <div>
            {<NA/>}
          </div>
         :
         <div>
          <NavHome title={"Change Password"}/>
          <div className="container-fluid">
          <div className="row">
              <div className="col-3"></div>
              
              <div className="col-6">
                <form id="chng-pass-form" className="row g-3" action="" onSubmit={handleSubmit}>
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
        </div>}
      </div>
    );
}

export default ChangePassword;
