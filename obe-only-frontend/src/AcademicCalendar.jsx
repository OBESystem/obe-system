import React from 'react'
import NavTeacher from './Teacher/NavTeacher'

function AcademicCalendar() {
  return (
    <div>
      {/* <NavTeacher/> */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">2022</th>
            <th scope='col'>Week</th>
            <th scope='col'>Day</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan={6}>September</td>
            <td colSpan={2}>15 (Thursday)</td>
            <td>Freshman Students’ orientation</td>
          </tr>
          <tr>
            <td colSpan={2}>17</td>
            <td>TFirst Day of Classes</td>
          </tr>
          <tr>
            <td colSpan={2}>17-23</td>
            <td>Week1</td>
          </tr>
          <tr>
            <td rowSpan={3}>24-30 <br /> (Week 2)</td>
            <td>23</td>
            <td>Submission of TSF and course description</td>
          </tr>
          <tr>
            <td>23&24</td>
            <td>Adding/Dropping**</td>
          </tr>
          <tr>
            <td>30</td>
            <td>Automatic conversion of UW, I, blank grades of Summer 2022-23 Semester to F</td>
          </tr>

          <tr>
            <td rowSpan={5}>October</td>
            <td>1-7 <br />(Week 3)</td>
            <td>7</td>
            <td>Makeup of Sunday Class** <br />[Online in MS Teams Platform]</td>
          </tr>
          <tr>
            <td>8-14 <br />(Week 4)</td>
            <td>14</td>
            <td>Makeup of Monday Class** <br />[Online in MS Teams Platform]</td>
          </tr>
          <tr>
            <td>15-21 <br />(Week 5)</td>
            <td>21</td>
            <td>Makeup of Tuesday Class** <br />[Online in MS Teams Platform]</td>
          </tr>
          <tr>
            <td colSpan={2}>22-28</td>
            <td>Week 7: Laboratory midterm exams</td>
          </tr>
          <tr>
            <td colSpan={2}>28-Nov 4</td>
            <td>Week 8: Midterm Exam**</td>
          </tr>


          <tr>
            <td rowSpan={6}>November</td>
            <td>5-11 <br />Week 9</td>
            <td>11</td>
            <td>Submission of midterm grades</td>
          </tr>
          <tr>
            <td rowSpan={2}>12-18 <br />Week 10</td>
            <td></td>
            <td>TPE</td>
          </tr>
          <tr>
            <td>18</td>
            <td>Midterm Grades Locked</td>
          </tr>
          <tr>
            <td rowSpan={2}>19-25 <br />Week 11</td>
            <td></td>
            
            <td>Pre-registration for Spring 2023-24**</td>
          </tr>
          <tr>
            <td>25</td>
            
            <td>Makeup of Wednesday Class** <br />[Online in MS Teams Platform]</td>
          </tr>
          <tr>
            <td>26-Dec 2: <br />Week 12</td>
            <td>Dec 2</td>
            <td>Makeup of Monday Class** <br /> [Online in MS Teams Platform]</td>
          </tr>

          <tr>
            <td rowSpan={5}>December</td>
            <td>3-9 <td>Week 13</td></td>
            <td>9</td>
            <td>Makeup of Tuesday Class** <br />[Online in MS Teams Platform]</td>
          </tr>
          <tr>
            <td colSpan={2}>10-16</td>
            <td>Week 14</td>
          </tr>
          <tr>
            <td colSpan={2}>17-23</td>
            <td>Week 15: Laboratory Final exams</td>
          </tr>
          <tr>
            <td colSpan={2}>23-30</td>
            <td>Week 16: Final Exam**</td>
          </tr>
          <tr>
            <td colSpan={2}>31-Jan 6</td>
            <td>Week 17: Set B exams, admission exam, etc.</td>
          </tr>

          <tr>
            <td rowSpan={4}>January</td>
            <td colSpan={2}>6</td>
            <td>Submission of Final Grades</td>
          </tr>
          <tr>
            <td colSpan={2}>13</td>
            <td>Final Grades Locked</td>
          </tr>
          <tr>
            <td colSpan={2}>7-20</td>
            <td>Semester break <br />Release of grades <br />Final Registration for Spring 2023-24**</td>
          </tr>
          <tr>
            <td colSpan={2}>Feb 8,2024</td>
            <td>Automatic conversion of UW, I grade of this semester to F</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default AcademicCalendar
