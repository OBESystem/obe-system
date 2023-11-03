import React from 'react'
import LOGO from '../Assets/LOGO.png';
import './stylesNavHome.css';

function NavHome(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light nv">
        <div className="container-fluid">
          <img className="navbar-brand" id="logo1" src={LOGO} alt="Logo" />
          <h1 className="navbar-brand-center" id="title">{props.title}</h1>
        </div>
      </nav>
    </div>
  )
}

export default NavHome