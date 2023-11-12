import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Login from './screens/ScreenLogin';
import Register from './screens/ScreenRegister';
import ScreenHome from './screens/ScreenHome';
import ScreenTarea from './screens/ScreenTarea';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';

function App() {
 //Cambiar path="/" de Register a ScreenHome
  return (
    <Router>
      <switch>
        <Routes> 
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Register />}></Route>
          <Route path='/home' element={<ScreenHome />}></Route>
          <Route path='/tarea' element={<ScreenTarea />}></Route>
        </Routes>
      </switch>
    </Router>
  );
}

export default App;
