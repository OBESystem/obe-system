import React, {useState} from 'react';
import Nav from './Nav';
import Sidebar from './Sidebar';
import './stylesTDB.css';

function TeacherDashboard() {
  const [toggle, setToggle] = useState(true);
  const Toggle = () =>{
    setToggle(!toggle)
  }
  return (
    <div className="container-fluid bg-secondary min-vh-100">
      <div className="row cnt">
        {toggle && <div className="col-4 col-md-2 bg-white vh-100 sBar">
          <Sidebar />
        </div>}
        <div className="col">
        <div className="px-3">
        <Nav Toggle={Toggle}/>
        <div className="container-fluid">
            <div className="row g-3 my-2">
                <div className="col-md-3 p-1">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                            <h3 className="fs-2">2</h3>
                            <p className="fs-5">Due Course File Submissions</p>
                        </div>
                        <i className="bi bi-card-list p-3 fs-1"></i>
                    </div>
                </div>
                <div className="col-md-3 p-1">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                        <div>
                            <h3 className="fs-2">3</h3>
                            <p className="fs-5">Due Marks Submissions</p>
                        </div>
                        <i className="bi bi-clock p-3 fs-1"></i>
                    </div>
                </div>
            </div>
            <div className="row g-3 my-2">
            <strong><span className="fs-3">List of courses:</span></strong>
            <table className="table table-responsive-sm table-striped table-bordered bg-white text-center">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Course Name</th>
                  <th scope="col">Year</th>
                  <th scope="col">Semester</th>
                  <th scope="col">Course type</th>
                  <th scope="col">Credit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                    <td>Data Structures</td>
                    <td>1st</td>
                    <td>2nd</td>
                    <td>Theory</td>
                    <td>3</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                    <td>Numerical Method Laboratory</td>
                    <td>2nd</td>
                    <td>1st</td>
                    <td>Lab</td>
                    <td>1</td>
                </tr>
              </tbody>
            </table>
            </div>
        </div>
    </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard;
