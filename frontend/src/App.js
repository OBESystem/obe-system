import React from 'react';
import Login from './Login';
import Home from './Home';
import NA from './NeedAuthentication';
import TeacherDashboard from './Teacher/TeacherDashboard';
import SignUpAsTeacher from './Teacher/SignUpAsTeacher';
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
