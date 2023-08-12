import React from 'react'

function Sidebar() {
  return (
    <div className="sidebar p-2">
        <div className="m-2">
            <div className="row">
                <div className="col"> <i class="bi bi-person-circle largeIcon"></i></div>
            </div>
            <div className="row"><span className="brand-name fs-4">ABCD ABCD</span></div>
        </div>
        <hr className="text-dark"></hr>
        <div className="list-group list-group-flush">
            <a className="list-group-item py-2">
                <i className="bi bi-speedometer2 fs-5 me-3"></i>
                <span className="fs-5">Dashboard</span>
            </a>
            <a className="list-group-item py-2">
                <i className="bi bi-house fs-5 me-3"></i>
                <span className="fs-5">Home</span>
            </a>
            <a className="list-group-item py-2">
                <i className="bi bi-power fs-5 me-3"></i>
                <span className="fs-5">Logout</span>
            </a>
        </div>
    </div>
  )
}

export default Sidebar