import React from 'react';

function NavTeacher(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark nvTeacher">
        <i className="navbar-brand bi bi-justify-left fs-4" onClick={props.Toggle}></i>
        <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
            aria-expanded="false" aria-label="Toggle navigation">
                <i className="bi bi-justify"></i>
        </button>
        <div><label id="navTitleTeacher">Outcome Based Education System</label></div>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {props.name}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="dropdownId">
                        <a className="dropdown-item">Profile</a>
                        <a className="dropdown-item">Settings</a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
  ) 
}

export default NavTeacher