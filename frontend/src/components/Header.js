import React, { useState } from 'react';
import { FaBell, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
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
              <span className="user-name">Mohamed Soliman</span>
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
