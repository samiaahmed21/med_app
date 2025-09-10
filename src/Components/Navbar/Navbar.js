import React, { useState } from 'react';
import './Navbar.css'; 
const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const handleClick = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav>
      {/* Logo section */}
      <div className="nav__logo">
        <a href="../Landing_Page/LandingPage.html">
          StayHealthy
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="26"
            width="26"
            viewBox="0 0 1000 1000"
            style={{ fill: '#3685fb' }}
          >
            <title>Doctor With Stethoscope SVG icon</title>
            <g>
              <g>
                <path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z" />
                <path d="M499.8,522.8c71.2,0,129.1-58.7,129.1-129.1H370.6C370.6,464.1,428.6,522.8,499.8,522.8z" />
              </g>
            </g>
          </svg>
        </a>
        <span>.</span>
      </div>

      {/* Hamburger menu icon */}
      <div className="nav__icon" onClick={handleClick}>
        <i className={`fa ${menuActive ? 'fa-times' : 'fa-bars'}`}></i>
      </div>

      {/* Navigation links */}
      <ul className={`nav__links ${menuActive ? 'active' : ''}`}>
        <li className="link">
          <a href="../Landing_Page/LandingPage.html">Home</a>
        </li>
        <li className="link">
          <a href="#">Appointments</a>
        </li>
        <li className="link">
          <a href="../Sign_Up/Sign_Up.html">
            <button className="btn1">Sign Up</button>
          </a>
        </li>
        <li className="link">
          <a href="../Login/Login.html">
            <button className="btn1">Login</button>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
