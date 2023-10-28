import React from 'react';
import Login from './Login/Login';
import Home from './Home';
import NA from './Teacher/NeedAuthentication';
import TeacherDashboard from './Teacher/TeacherDashboard';
import SignUpAsTeacher from './Teacher/SignUpAsTeacher';
import CourseFile from './Teacher/CourseFile';
import AcademicCalendar from './AcademicCalendar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/SignUpAsTeacher' element={<SignUpAsTeacher />} />
        <Route path='/TeacherDashboard' element={<TeacherDashboard />} />
        <Route path='/NeedAuthentication' element={<NA />} />
        <Route path='/Enter-Course-File' element={<CourseFile />} />
        <Route path='/AcademicCalendar' element={<AcademicCalendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
