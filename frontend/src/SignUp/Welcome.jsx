import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesWelcome.css';
import Footer from '../MainComponents/Footer';
import NavHome from '../MainComponents/NavHome';

function Welcome() {
    const navigate = useNavigate();

    return (
      <div id="wel">
        <NavHome title={"Outcome Based Education System"}/>
        <div className="container-fluid">
        <div className="row">
            <div className="col-3"></div>
            
            <div className="col-6">
              <p>Welcome to the System</p>
              <p>Please wait until your registration gets authorized.</p>
            </div>
  
            <div className="col-3"></div>
          </div>
          <Footer/>
        </div>
      </div>
    );
}

export default Welcome;
