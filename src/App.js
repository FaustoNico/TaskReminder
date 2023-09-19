import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Login from './screens/ScreenLogin';
import Register from './screens/ScreenRegister';
import ScreenHome from './screens/ScreenHome';
import ScreenTarea from './screens/ScreenTarea';
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
            <Route path="/" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path='/home' element={<ScreenHome/>}></Route>
            <Route path='/tarea' element={<ScreenTarea/>}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
