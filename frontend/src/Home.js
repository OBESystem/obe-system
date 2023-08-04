import React from 'react';
import './stylesHomepage.css';
import LOGO from './LOGO.png';

function Home() {
  return (
    <div>
      <div id="header">
        <img id="logo" src={LOGO} alt="JU Logo" />
        <h1 id="title">Outcome Based Education System</h1>
        <button className="header-button" id="login" onClick={() => window.open('/Login', '_blank')}>
          Log In
        </button>
        <button className="header-button" id="signUp" onClick={() => window.open('/SignUpAsTeacher', '_blank')}>
          Sign Up
        </button>
      </div>
      <div id="image"></div>
      <div id="quote">
        <strong>A large part of what we call teaching is that the teacher should be able to use education to reorganize a child's thoughts, attitudes and feelings.</strong>
        <br />
        - <em>Benjamin Bloom</em>
      </div>
      <div id="footer">
        <hr className="line" />
        Jahangirnagar University, Savar, Dhaka-1342. Telephone: PABX:02224491045-51,
        <br />Fax:02224491952
      </div>
    </div>
  );
}

export default Home;
