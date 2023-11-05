import React from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesAdminDashboard.css';
import axios from 'axios';

function AdminSidebar(props) {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.setItem('auth', 'false');
        axios.get('http://localhost:7000/Logout')
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/');
                }
                else {
                    alert("error");
                }
            }).catch(err => console.log(err))
    }

    const goToDashboard = () => {
        navigate('/Department-Admin-Dashboard');
    }

    const goToUploadAcademicCalendar = () => {
        navigate('/UploadAcademicCalendar');
    };
    const goToApproveTeacher = () => {
        navigate('/ApproveTeacher');
    };

    const goToAssignCourse = () => {
        navigate('/AssignCourse');
    };

    const goToCreateExam = () => {
        navigate('/CreateExam');
    };

    const goToAcademicCalendar = () => {
        navigate('/AcademicCalendar');
    };

    return (
        <div className="sidebar p-2">
            <div className="m-2">
                <div className="row">
                    <div className="col"> <i class="bi bi-person-circle largeIcon"></i></div>
                </div>
                <div className="row">
                    <strong><span className="brand-name fs-4">{props.name}</span></strong>
                    <span className="brand-name fs-5">{props.designation}</span>
                    <span className="brand-name fs-6">(Department Admin)</span>
                    <span className="brand-name fs-6">Department of {props.dept},</span>
                    <span className="brand-name fs-6">Jahangirnagar University</span>
                </div>
            </div>
            <hr className="text-dark"></hr>
            <div className="list-group list-group-flush">
                <a className="list-group-item py-2" onClick={goToDashboard} >
                    <i className="bi bi-speedometer2 fs-5 me-3"></i>
                    <span className="fs-5">Dashboard</span>
                </a>
            </div>

            <hr className="text-dark"></hr>
            <hr className="text-dark"></hr>
            <div className='list-group list-group-flush'>
                <span className='fs-5'><b>Roles as Teacher</b></span>
            </div>

            <hr className="text-dark"></hr>
            <div className="list-group list-group-flush">
                <a className="list-group-item py-2" >
                    <i className="bi bi-file-earmark-bar-graph fs-5 me-3"></i>
                    <span className="fs-5">Submit Marks</span>
                </a>
                <a className="list-group-item py-2" onClick={goToAcademicCalendar}>
                    <i className="bi bi-calendar fs-5 me-3"></i>
                    <span className="fs-5">Academic calendar</span>
                </a>

            </div>


            <hr className="text-dark"></hr>
            <hr className="text-dark"></hr>
            <div className='list-group list-group-flush'>
                <span className='fs-5'><b>Roles as Department Admin</b></span>
            </div>
            <hr className="text-dark"></hr>

            <div className="list-group list-group-flush">
                <a className="list-group-item py-2 listLinkDAdmin" onClick={goToUploadAcademicCalendar}>
                    <i className="bi bi-calendar-event fs-5 me-3"></i>
                    <span className="fs-5">Upload Academic calendar</span>
                </a>
                <a className="list-group-item py-2 listLinkDAdmin" onClick={goToApproveTeacher}>
                    <i className="bi bi-clipboard-check fs-5 me-3"></i>
                    <span className="fs-5">Approve Teacher Account</span>
                </a>
                <a className="list-group-item py-2 listLinkDAdmin" onClick={goToCreateExam}>
                    <i className="bi bi-plus-circle fs-5 me-3"></i>
                    <span className="fs-5">Manage Exam</span>
                </a>
                <a className="list-group-item py-2 listLinkDAdmin" onClick={goToAssignCourse}>
                    <i className="bi bi-clipboard-plus fs-5 me-3"></i>
                    <span className="fs-5">Assign/Update Course Teacher</span>
                </a>
                <a className="list-group-item py-2 text-danger listLinkDAdmin" id="logOutLink" onClick={handleLogout}>
                    <i className="bi bi-power fs-5 me-3"></i>
                    <span className="fs-5">Logout</span>
                </a>
            </div>
        </div>
    )
}

export default AdminSidebar;