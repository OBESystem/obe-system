import React from 'react';
import './stylesHomepage.css';
import LOGO from './Assets/LOGO.png';

function Home() {
  return (
    <div id="hp">
      <nav className="navbar navbar-expand-lg navbar-light bg-light nv1">
        <div className="container-fluid">
          <img className="navbar-brand-center" id="logo" src={LOGO} alt="Logo" />
          <h1 className="navbar-brand-center" id="title">Outcome Based Education System</h1>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button className="nav-link active header-button" id="btn1" aria-current="page" onClick={() => window.open('/Login', '_self')}>Log in</button>
              </li>
              <li className="nav-item dropdown">
                <button className="nav-link active header-button" id="btn2" aria-current="page" onClick={() => window.open('/SignUp', '_self')}>
                  Sign Up
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        
      <div class="row">
          <div className="col-2"></div>
          <div className="col-8" id="image"></div>
          <div className="col-2"></div>
        </div>
        <div className="row" id="quote">
          <div className="col-sm-1"></div>
          <div className="col-10">
            <label className="fw-bold">A large part of what we call teaching is that the teacher should be able to use education to reorganize a child's thoughts, attitudes and feelings.</label>
           <br/>- <em>Benjamin Bloom</em>
          </div>
          <div className="col-sm-1"></div>
        </div>
        <div className="row" id="footer">
          <div className="col-1"></div>
          <div className="col-10">
              <div id="line"></div>
              Jahangirnagar University, Savar, Dhaka-1342. Telephone: PABX:02224491045-51,<br />Fax:02224491952
          </div>
          <div className="col-1"></div>
        </div>
     

      </div>
    </div>
  );
}

export default Home;

