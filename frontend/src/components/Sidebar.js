
import React, { useState, useEffect } from 'react';
import { 
  FaHome,
  FaChartBar, 
  FaFileAlt, 
  FaCog,
  FaUpload,
  FaBuilding,
  FaHeadset
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [driveLink, setDriveLink] = useState('');
  const [smartsheetLink, setSmartsheetLink] = useState('');
  

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData && userData.id) {
          // Fetch Drive Link
          const driveResponse = await fetch(`http://localhost:4000/api/auth/drive-link/${userData.id}`);
          const driveData = await driveResponse.json();
          if (driveData.status === 'success') {
            setDriveLink(driveData.data.googleDriveLink);
          }

          // Fetch Smartsheet Link
          const smartsheetResponse = await fetch(`http://localhost:4000/api/auth/smartsheet-link/${userData.id}`);
          const smartsheetData = await smartsheetResponse.json();
          if (smartsheetData.status === 'success') {
            setSmartsheetLink(smartsheetData.data.smartsheetLink);
          }
        }
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    };

    fetchLinks();
  }, []);

  const handleDocumentUpload = () => {
    if (driveLink) {
      window.open(driveLink, '_blank');
    } else {
      console.error('No drive link available');
      // Optionally show an error message to the user
    }
  };
  const handleSmartsheetOpen = () => {
    if (smartsheetLink) {
      window.open(smartsheetLink, '_blank');
    } else {
      console.error('No smartsheet link available');
    }
  };

  const menuItems = [
    { icon: <FaHome />, label: 'Home Dashboard', path: '/' },
    { icon: <FaChartBar />, label: 'Financial Overview', onClick: handleSmartsheetOpen },
    { icon: <FaFileAlt />, label: 'Reports', path: '/reports' },
    { icon: <FaCog />, label: 'Settings', path: '/settings' },
  ];

  const quickLinks = [
    { icon: <FaUpload />, label: 'Document Upload', onClick: handleDocumentUpload },
    { icon: <FaBuilding />, label: 'Company Profile', path: '/company' },
    { 
      icon: <FaHeadset />, 
      label: 'Quote Generator', 
      onClick: () => window.open('https://www.houseofcompanies.io/quote-generator', '_blank')
    },
  ];

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className={`sidebar-item ${index === 0 ? 'first-item' : ''}`}
            onClick={item.onClick || (() => {})}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </div>
        ))}
        
        <div className="quick-links-divider">Quick Links</div>
        
        {quickLinks.map((item, index) => (
          <div 
            key={`quick-${index}`} 
            className="sidebar-item"
            onClick={item.onClick || (() => {})}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
