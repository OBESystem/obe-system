import React from 'react';
import Nav from './Nav';

function Home({Toggle}) {
  return (
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
        </div>
    </div>
  )
}

export default Home