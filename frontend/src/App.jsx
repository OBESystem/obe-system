import React from 'react';
import Login from './Login/Login';
import Home from './Home';
import NA from './Teacher/NeedAuthentication';
import TeacherDashboard from './Teacher/TeacherDashboard';
import SignUp from './SignUp/SignUp';
import CourseFile from './Teacher/CourseFile';
import AcademicCalendar from './AcademicCalendar/AcademicCalendar';
import Welcome from './SignUp/Welcome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
