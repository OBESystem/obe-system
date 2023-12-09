import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './Login/Login';
import SendEmailResetPassword from './Login/SendEmailResetPassword';
import ChangePassword from './Login/ChangePassword';
import ResetPassword from './Login/ResetPassword';
import Home from './Home';
import NA from './Teacher/NeedAuthentication';
import TeacherDashboard from './Teacher/TeacherDashboard';
import ECODashboard from './ExamControlOffice/ECODashboard';
import SignUp from './SignUp/SignUp';
import CourseFile from './Teacher/CourseFile';
import AcademicCalendar from './AcademicCalendar/AcademicCalendar';
import Welcome from './SignUp/Welcome';
import AdminDashboard from './DeptAdmin/AdminDashboard';
import ApproveTeacher from './DeptAdmin/ApproveTeacher';
import AssignCourse from './DeptAdmin/AssignCourse';
import UploadAcademicCalendar from './DeptAdmin/UploadAcademicCalendar';
import CreateExam from './DeptAdmin/CreateExam';
import AssignCourseTeacher2 from './DeptAdmin/AssignCourseTeacher2';



function App() {
  const {access_token} = useSelector(state=> state.auth)
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/NeedAuthentication' element={<NA />} />
        <Route exact path='/Login' element={<Login />} />
        <Route exact path='/Send-Email-to-Reset-password' element={<SendEmailResetPassword />} />
        <Route exact path='api/user/reset-password/:id/:token' element={<ResetPassword />} />
        <Route exact path='/ChangePassword' element={<ChangePassword />} />
        <Route exact path='/' element={<Home />} />
        <Route exact path='/SignUp' element={<SignUp />} />
        <Route exact path='/TeacherDashboard' element={access_token ? <TeacherDashboard /> : <TeacherDashboard />} />
        <Route exact path='/Enter-Course-File' element={<CourseFile />} />
        <Route exact path='/AcademicCalendar' element={<AcademicCalendar />} />
        <Route exact path='/Welcome' element={<Welcome />} />
        <Route exact path='/Exam-Control-Office-Dashboard' element={<ECODashboard />} />
        <Route exact path='/Department-Admin-Dashboard' element={<AdminDashboard />} />
        <Route exact path='/ApproveTeacher' element={<ApproveTeacher />} />
        <Route exact path='/AssignCourse' element={<AssignCourse />} />
        <Route exact path='/CreateExam' element={<CreateExam />} />
        <Route exact path='/UploadAcademicCalendar' element={<UploadAcademicCalendar />} />
        <Route exact path='/CreateExamAndAssignCourse' element={<AssignCourseTeacher2 />} />
        <Route path='*' element={<h1>Error 404 Page not found!!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
