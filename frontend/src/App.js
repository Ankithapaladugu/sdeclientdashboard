import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';

import Sidebar from './components/Sidebar';
import Login from './components/Login';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [driveLink, setDriveLink] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        if (parsed && parsed.id && parsed.email) {
          setIsLoggedIn(true);
          setUserId(parsed.id);
          fetchDriveLink(parsed.id);
        }
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const fetchDriveLink = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/auth/drive-link/${id}`);
      const data = await response.json();
      
      if (data.status === 'success') {
        setDriveLink(data.data.googleDriveLink);
      }
    } catch (error) {
      console.error('Error fetching drive link:', error);
    }
  };

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUserId(userData.id);
    fetchDriveLink(userData.id);
  };

  
    return (
      <BrowserRouter>
        <Routes>
          <Route 
            path="/login" 
            element={!isLoggedIn ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/" />} 
          />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <div className="dashboard">
                  <Header setIsLoggedIn={setIsLoggedIn} />
                  <Sidebar />
                  <div className="dashboard-content">
                    {/* ...existing dashboard content... */}
                  </div>
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }

export default App;