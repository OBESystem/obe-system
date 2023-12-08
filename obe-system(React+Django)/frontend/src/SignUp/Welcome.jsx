import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesWelcome.css';
import Footer from '../MainComponents/Footer';
import NavHome from '../MainComponents/NavHome';
import { removeToken } from '../services/LocalStorageService'
import { useDispatch } from 'react-redux';
import { unsetUserToken} from '../features/authSlice';

function Welcome() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const goToHome = () => {
      removeToken();
      dispatch(unsetUserToken({access_token : null}))
      navigate('/');
    };

    return (
      <div id="wel" className="min-vh-100">
        <NavHome title={"Outcome Based Education System"}/>
        <div className="container-fluid">
        <div className="row">
            <div className="col-3"></div>
            
            <div className="col-6 text-center" id="welcomeDiv">
              <p>Welcome to the System</p>
              <p>Please wait until your registration gets authorized..</p>
              <button type="button" class="btn btn-primary btn-lg" id="WelcomePagebtn" onClick={goToHome}>Go to Home</button>
            </div>
  
            <div className="col-3"></div>
          </div>
          <Footer/>
        </div>
      </div>
    );
}

export default Welcome;
