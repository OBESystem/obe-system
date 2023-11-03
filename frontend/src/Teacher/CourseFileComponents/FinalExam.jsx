import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import '../stylesCourseFile.css';

function FinalExam() {

    const handleSubmit=(event) => {
        event.preventDefault();
    }

    return (
        <div>
            <p>
              <label className="fs-2"><strong>Final exam:</strong></label>
            </p>
            <div>
            <div className="card card-body">
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="finaLq1" className="form-label infoFormTitle">Question:</label>
                    <input className="form-control" name="questionFinal1" type="file" id="finaLq1" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="finaLcp1" className="form-label infoFormTitle">Compliance Form:</label>
                    <input className="form-control" name="complianceFormFinal1" type="file" id="finaLcp1" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="finaLansH1" className="form-label infoFormTitle">Answer Script for Highest Marks Attained:</label>
                    <input className="form-control" name="answerscriptBestFinal1" type="file" id="finaLansH1"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="finaLansH1" className="form-label infoFormTitle">Answer Script for Average Marks Attained:</label>
                    <input className="form-control" name="answerscriptAvgFinal1" type="file" id="finaLansA1"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="finaLansL1" className="form-label infoFormTitle">Answer Script for Lowest Marks Attained:</label>
                    <input className="form-control" name="answerscriptLowFinal1" type="file" id="finaLansL1"/>
                </div>
                <button type="reset" className="btn btn-secondary">Reset</button>
                <button type="submit" className="btn btn-success btnSubmit">Save</button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default FinalExam