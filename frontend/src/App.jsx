import React from 'react';
import Login from './Login/Login';
import Home from './Home';
import NA from './Teacher/NeedAuthentication';
import TeacherDashboard from './Teacher/TeacherDashboard';
import ECODashboard from './ExamControlOffice/ECODashboard';
import SignUp from './SignUp/SignUp';
import CourseFile from './Teacher/CourseFile';
import AcademicCalendar from './AcademicCalendar/AcademicCalendar';
import Welcome from './SignUp/Welcome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './DeptAdmin/AdminDashboard';
import ApproveTeacher from './DeptAdmin/ApproveTeacher';
import AssignCourse from './DeptAdmin/AssignCourse';
import UploadAcademicCalendar from './DeptAdmin/UploadAcademicCalendar';
import CreateExam from './DeptAdmin/CreateExam';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/TeacherDashboard' element={<TeacherDashboard />} />
        <Route path='/NeedAuthentication' element={<NA />} />
        <Route path='/Enter-Course-File' element={<CourseFile />} />
        <Route path='/AcademicCalendar' element={<AcademicCalendar />} />
        <Route path='/Welcome' element={<Welcome />} />
        <Route path='/Exam-Control-Office-Dashboard' element={<ECODashboard />} />
        <Route path='/Department-Admin-Dashboard' element={<AdminDashboard />} />
        <Route path='/ApproveTeacher' element={<ApproveTeacher />} />
        <Route path='/AssignCourse' element={<AssignCourse />} />
        <Route path='/CreateExam' element={<CreateExam />} />
        <Route path='/UploadAcademicCalendar' element={<UploadAcademicCalendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
