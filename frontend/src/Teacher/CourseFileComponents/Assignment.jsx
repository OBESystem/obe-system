import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import '../stylesCourseFile.css';

function Assignment(props) {

    const handleSubmit=(event) => {
        event.preventDefault();
    }


  return (
    <div>
        <div className="item">
            <div className="card card-body">
            <label id="courseFileClassTestTitle">Assignment {props.assignmentID}:</label>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="q1" className="form-label infoFormTitle">Title:</label>
                    <input className="form-control" name="assignmentTitle" type="text" id="assignmentTitle" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="assignmentCp" className="form-label infoFormTitle">Compliance Form:</label>
                    <input className="form-control" name="complianceFormAssignment" type="file" id="assignmentCp" required/>
                </div>
                <button type="reset" className="btn btn-secondary">Reset</button>
                <button type="submit" className="btn btn-success btnSubmit">Save</button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default Assignment;