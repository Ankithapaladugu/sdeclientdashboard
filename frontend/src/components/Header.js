import React, { useState,useEffect } from 'react';
import { FaBell, FaUser, FaCog, FaSignOutAlt, FaQuestionCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ setIsLoggedIn }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    // Get user data from localStorage when component mounts
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserName(user.name); // Set the user's name from stored data
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setShowProfile(false);
    navigate('/login');
  };
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <img src="/images/c.png" alt="Company Logo" />
          </div>
        </div>
        <div className="header-right">
        <div 
          className="help-container"
          onClick={() => window.open('https://ebranch.in/onboarding/start-here/client-support/', '_blank')}
        >
          <FaQuestionCircle className="help-icon" />
          <span className="help-text">Help</span>
        </div>
          <div className="notification-container">
            <FaBell 
              className="notification-icon"
              onClick={() => setShowNotifications(!showNotifications)}
            />
            {showNotifications && (
              <div className="notification-dropdown">
                <div className="notification-item">No new notifications</div>
              </div>
            )}
          </div>
          <div className="profile-container">
            <div className="profile-trigger" onClick={() => setShowProfile(!showProfile)}>
              <span className="user-name">{userName || 'User'}</span>
              <div className="profile-icon">
                <FaUser />
              </div>
            </div>
            {showProfile && (
              <div className="profile-dropdown">
                <div className="profile-item">
                  <FaUser /> Profile
                </div>
                <div className="profile-item">
                  <FaCog /> Settings
                </div>
                <div className="divider"></div>
                <div className="profile-item" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;