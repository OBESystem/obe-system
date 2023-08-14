import React from 'react'

function Sidebar(props) {

  return (
    <div className="sidebar p-2">
        <div className="m-2">
            <div className="row">
                <div className="col"> <i class="bi bi-person-circle largeIcon"></i></div>
            </div>
            <div className="row">
                <strong><span className="brand-name fs-4">{props.name}</span></strong>
                <span className="brand-name fs-5">Lecturer</span>
                <span className="brand-name fs-6">Department of {props.dept},</span>
                <span className="brand-name fs-6">Jahangirnagar University</span>
            </div>
        </div>
        <hr className="text-dark"></hr>
        <div className="list-group list-group-flush">
            <a className="list-group-item py-2">
                <i className="bi bi-speedometer2 fs-5 me-3"></i>
                <span className="fs-5">Dashboard</span>
            </a>
            <a className="list-group-item py-2">
                <i className="bi bi-power fs-5 me-3"></i>
                <span className="fs-5" onClick={() => window.open('/Login', '_self')}>Logout</span>
            </a>
        </div>
    </div>
  )
}

export default Sidebar