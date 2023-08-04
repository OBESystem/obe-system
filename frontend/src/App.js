import React from 'react';
import Login from './Login';
import Home from './Home';
import SignUpAsTeacher from './SignUpAsTeacher';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/SignUpAsTeacher' element={<SignUpAsTeacher />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
