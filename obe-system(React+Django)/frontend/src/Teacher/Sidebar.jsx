import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../services/LocalStorageService'
import { useDispatch } from 'react-redux';
import { unsetUserToken} from '../features/authSlice';

function Sidebar(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleLogout = () => {
        removeToken();
        dispatch(unsetUserToken({access_token : null}))
        navigate('/');
    }

    const goToDashboard = () => {
        navigate('/TeacherDashboard');
    }

    const goToChangePassword = () => {
        navigate('/ChangePassword');
    }

    const goToAcademicCalendar = () => {
        window.open('/AcademicCalendar', '_blank');
        //window.open('/AcademicCalendar', '_self');
    };

    return (
        <div className="sidebar p-2">
            <div className="m-2">
                <div id="ppDiv">
                    <img src={props.profile_picture} id="profilePicture"/>
                </div>
                <div className="row">
                    <strong><span className="brand-name fs-4">{props.name}</span></strong>
                    <span className="brand-name fs-5">{props.designation}</span>
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
                <a className="list-group-item py-2" onClick={goToChangePassword} >
                    <i className="bi bi-speedometer2 fs-5 me-3"></i>
                    <span className="fs-5">Change Password</span>
                </a>
                <a className="list-group-item py-2" >
                    <i className="bi bi-file-earmark-bar-graph fs-5 me-3"></i>
                    <span className="fs-5">Submit Marks</span>
                </a>
                <a className="list-group-item py-2" onClick={goToAcademicCalendar}>
                        <i className="bi bi-calendar fs-5 me-3"></i>
                        <span className="fs-5">Academic calendar</span>
                </a>
                <a className="list-group-item py-2 text-danger" onClick={handleLogout}>
                        <i className="bi bi-power fs-5 me-3"></i>
                        <span className="fs-5">Logout</span>
                </a>
            </div>
        </div>
    )
}

export default Sidebar;