import React from 'react';
import Login from './Login';
import Home from './Home';
import TeacherDashboard from './TeacherDashboard';
import SignUpAsTeacher from './SignUpAsTeacher';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/SignUpAsTeacher' element={<SignUpAsTeacher />} />
        <Route path='/TeacherDashboard' element={<TeacherDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
