import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import '../stylesCourseFile.css';

function ClassTest(props) {
  

    const handleSubmit=(event) => {
        event.preventDefault();
    }

  return (
    <div>
        <div className="item">
            <div className="card card-body">
            <label id="courseFileClassTestTitle">Class Test {props.ctID}:</label>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label htmlFor="q1" className="form-label infoFormTitle">Question:</label>
                <input className="form-control" name="questionCT1" type="file" id="q1" required/>
                </div>
                <div className="mb-3">
                <label htmlFor="cp1" className="form-label infoFormTitle">Compliance Form:</label>
                <input className="form-control" name="complianceFormCT1" type="file" id="cp1" required/>
                </div>
                <div className="mb-3">
                <label htmlFor="ansH1" className="form-label infoFormTitle">Answer Script for Highest Marks Attained:</label>
                <input className="form-control" name="answerscriptBestCT1" type="file" id="ansH1" required/>
                </div>
                <div className="mb-3">
                <label htmlFor="ansH1" className="form-label infoFormTitle">Answer Script for Average Marks Attained:</label>
                <input className="form-control" name="answerscriptAvgCT1" type="file" id="ansA1" required/>
                </div>
                <div className="mb-3">
                <label htmlFor="ansL1" className="form-label infoFormTitle">Answer Script for Lowest Marks Attained:</label>
                <input className="form-control" name="answerscriptLowCT1" type="file" id="ansL1" required/>
                </div>
                <button type="reset" className="btn btn-secondary">Reset</button>
                <button type="submit" className="btn btn-success btnSubmit">Save</button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default ClassTest;