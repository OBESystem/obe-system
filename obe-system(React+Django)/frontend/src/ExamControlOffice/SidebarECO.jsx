import React from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesECODB.css';
import { removeToken } from '../services/LocalStorageService'

function Sidebar(props) {
    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate('/Exam-Control-Office-Dashboard');
    }

    const goToAcademicCalendar = () => {
        window.open('/AcademicCalendar', '_blank');
    };

    const handleLogout = () => {
        navigate('/');
        removeToken();
    }

    return (
        <div className="sidebarECO p-2">
            <div className="m-2">
                <div className="row">
                    <div className="col"> <i className="bi bi-person-circle" id="person-circle-ECO"></i></div>
                </div>
                <div className="row">
                    <strong><span className="brand-name fs-4">{props.name}</span></strong>
                    <span className="brand-name fs-5">{props.designation}</span>
                    <span className="brand-name fs-6">{props.dept},</span>
                    <span className="brand-name fs-6">Jahangirnagar University</span>
                </div>
            </div>
            <hr className="text-dark"></hr>
            <div className="list-group list-group-flush">
                <a className="list-group-item py-2 sidebarECOList" onClick={goToDashboard} >
                    <i className="bi bi-speedometer2 fs-5 me-3"></i>
                    <span className="fs-5">Dashboard</span>
                </a>
                <a className="list-group-item py-2 sidebarECOList" onClick={goToAcademicCalendar}>
                        <i className="bi bi-calendar fs-5 me-3"></i>
                        <span className="fs-5">Academic calendar</span>
                </a>
                <a className="list-group-item py-2 text-danger sidebarECOList" onClick={handleLogout}>
                        <i className="bi bi-power fs-5 me-3"></i>
                        <span className="fs-5">Logout</span>
                </a>
            </div>
        </div>
    )
}

export default Sidebar;