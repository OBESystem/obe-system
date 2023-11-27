import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesLogin.css';
import Footer from '../MainComponents/Footer';
import NavHome from '../MainComponents/NavHome';
import { useLoginUserMutation, useGetUserMutation} from '../services/obesApi'
import { storeToken, getToken} from '../services/LocalStorageService'
import { setUserToken} from '../features/authSlice';
import { useDispatch } from 'react-redux';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const dispatch = useDispatch()
    const [serverErrors, setServerErrors] = useState({});
    const [loginUser] =  useLoginUserMutation()
    const [getUser] =  useGetUserMutation()
    const navigate = useNavigate();

    const handleInput=(event) => {
      setValues(prev => ({...prev, [event.target.name]: [event.target.value]}));
    }
    const handleReset=(event) => {
      setServerErrors({
        email: '',
        password: ''
      });
    }

    const handleSubmit= async(event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const actualData = {
        email: data.get('email'),
        password: data.get('password')
      }
      const res = await loginUser(actualData);
      if(res.error)
      {
        console.log(res.error.data.errors)
        setServerErrors(res.error.data.errors)
      }
      if(res.data)
      {
        console.log(res.data)
        storeToken(res.data.token)
        let {access_token} = getToken()
        dispatch(setUserToken({access_token: access_token}))
        const { data: userData } = await getUser(access_token);
        if (userData && userData.userType) 
        {
          if (userData.userType === '0') 
          {
            navigate('/Welcome');
          } 
          else if (userData.userType === '1') 
          {
            navigate('/TeacherDashboard');
          }
          else
          {
            navigate('/Welcome');
          }
        } 
        else 
        {
          navigate('/Welcome');
        }
      }
    }
    
    let {access_token} = getToken()
    useEffect(() => {
        dispatch(setUserToken({access_token: access_token}))
    }, [access_token, dispatch])

    
    const goToResetPassword = () => {
      navigate('/Send-Email-to-Reset-password');
    }

    return (
      <div id="lgIn" className="min-vh-100">
        <NavHome title={"Log in"}/>
        <div className="container-fluid">
        <div className="row">
            <div className="col-3"></div>
            
            <div className="col-6">
              <form id="login-form" className="row g-3" action="" onSubmit={handleSubmit}>
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
                    <div className="row inputDiv">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input type="password" className={`form-control ${serverErrors.password ? 'is-invalid' : ''}`} id="password" name="password" onChange={handleInput}/>
                      {serverErrors.password && (
                        <div className="invalid-feedback">
                          {serverErrors.password}
                        </div>
                      )}
                    </div>
                    <div className="row bn">
                      <button type="reset" className="buttons" id="reset" onClick={handleReset}>Reset</button>
                      <button type="submit" className="buttons" id="submit">Submit</button>
                    </div>
                    <div className="row" id="hrefRPDiv">
                      <div className="form-check text-center">
                        <a href="#" id="hrefRP" className="fs-7" onClick={goToResetPassword}>Forgot Password?</a>
                      </div>
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
