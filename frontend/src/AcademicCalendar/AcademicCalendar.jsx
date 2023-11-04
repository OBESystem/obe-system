import React from "react";
import NavHome from "../MainComponents/NavHome";
import Footer from "../MainComponents/Footer";
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
      <Footer />
    </div>
  );
}

export default AcademicCalendar;
