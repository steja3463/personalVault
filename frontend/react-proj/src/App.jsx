import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';

function App(){
  const isLoggedIn = !!localStorage.getItem('token');
  return(
    <BrowserRouter>
       <Routes>
           <Route path = '/' element = {<Register/>} />
           <Route path = '/login' element = {<Login/>} />
           <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
       </Routes>
    </BrowserRouter>
  );
}

export default App;