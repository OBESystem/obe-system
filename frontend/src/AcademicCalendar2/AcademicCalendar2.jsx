import React, { useEffect } from 'react';
import $ from 'jquery';
import 'evo-calendar';
import './stylesAcademicCalendar2.css';
import './evo-calendar.royal-navy.min.css';
import './evo-calendar.min.css';
import LOGO from '../Assets/LOGO.png';
import Footer from "../MainComponents/Footer";

function AcademicCalendar() {
    useEffect(() => {
        $(document).ready(function() {
          $('#calendar').evoCalendar({
            theme: 'Royal Navy',
            calendarEvents: [
              {
                id: 'event1',
                name: "New Year",
                date: "January/1/2020",
                description: "lorem ufbrgoruey",
                type: "holiday",
                everyYear: true
              },
              {
                name: "Vacation Leave",
                badge: "02/13 - 02/15",
                date: ["February/13/2020", "February/15/2020"],
                description: "Vacation leave for 3 days.",
                type: "event",
                color: "#63d867"
              }
            ]
          });
        });
  }, []);

  return (
    <div id="calendarBody">
        <div id="nv3">
          <nav className="navbar navbar-expand-lg navbar-light bg-light nv3">
          <div className="container-fluid">
            <img className="navbar-brand" id="logo1" src={LOGO} alt="Logo" />
            <h1 className="navbar-brand-center" id="title">Academic Calendar</h1>
          </div>
          </nav>
        </div>
        <div class="hero">
            <div id="calendar"></div>
        </div>
        <Footer/>
    </div>
  )
}

export default AcademicCalendar