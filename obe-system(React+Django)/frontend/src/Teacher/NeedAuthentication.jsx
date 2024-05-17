import React from 'react';
import './stylesNA.css';
import { useNavigate } from 'react-router-dom';


function NeedAuthentication(){
    const navigate = useNavigate();
    return (
        <div className="naBdy text-center ">
            <div className="container-flex">
                <div className="row">
                    <div className="col-12 text-center na">
                        <label className="text-danger fs-1">You are not authenticated!!</label><br/>
                    </div>
                </div>
                <div className="row text-center na">
                    <div className="col-5"></div>
                    <div className="col-1"><button type="button" className="btn btn-primary" onClick={() => navigate("/")}>Go to home</button></div>
                    <div className="col-1"><button type="button" className="btn btn-primary" onClick={() => navigate("/Login")}>Log in</button></div>
                    <div className="col-5"></div>
                </div>
            </div>
        </div>
    );
}

export default NeedAuthentication;