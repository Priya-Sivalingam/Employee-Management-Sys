import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import EmployeeEdit from './Pages/EmployeeEdit';
import EmployeeView from './Pages/EmployeeView';

function App() {
    const isAuthenticated = !!localStorage.getItem('jwtToken'); 
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
          navigate('/');
      }
  }, [navigate]);

    return (
        <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
            <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
            <Route path="/employee/:id" element={isAuthenticated ?<EmployeeView />: <Navigate to="/home" />} />
            <Route path="/employee/edit/:id" element={isAuthenticated ?<EmployeeEdit />: <Navigate to="/home" />}/>
            
        </Routes>
    );
}

export default App;
