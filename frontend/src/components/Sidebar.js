import React from 'react';
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
  const handleDocumentUpload = () => {
    window.open('https://drive.google.com/drive/folders/1mfk37jWF2NV8LYBdBgmc5-FluNMy2USn?usp=sharing', '_blank');
  };

  const menuItems = [
    { icon: <FaHome />, label: 'Home Dashboard', path: '/' },
    { icon: <FaChartBar />, label: 'Financial Overview', path: '/financial' },
    { icon: <FaFileAlt />, label: 'Reports', path: '/reports' },
    { icon: <FaCog />, label: 'Settings', path: '/settings' },
  ];

  const quickLinks = [
    { icon: <FaUpload />, label: 'Document Upload', onClick: handleDocumentUpload },
    { icon: <FaBuilding />, label: 'Company Profile', path: '/company' },
    { icon: <FaHeadset />, label: 'Support Center', path: '/support' },
  ];

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className={`sidebar-item ${index === 0 ? 'first-item' : ''}`}
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
