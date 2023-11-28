import React from "react";
import NavHome from "../MainComponents/NavHome";
import "./stylesAcademicCalendar.css";

function AcademicCalendar() {
  return (
    <div id="cntCalendar">
      <NavHome title={"Academic Calendar"} />
      <div id="AcademicCalendar">
      <div className='container fluid'>
            <div className="ifrme">
                <iframe
                    src="../Academic Calendar.pdf#zoom=100"
                    width="900px"
                    height="100%"
                    title="PDF Viewer"
                ></iframe>
            </div>
        </div>
      </div>
      <div className="row" id="footerSU">
          <div className="col-1"></div>
          <div className="col-10">
              <div id="line"></div>
              Jahangirnagar University, Savar, Dhaka-1342. Telephone: PABX:02224491045-51,<br />Fax:02224491952
          </div>
          <div className="col-1"></div>
      </div>
    </div>
  );
}

export default AcademicCalendar;
