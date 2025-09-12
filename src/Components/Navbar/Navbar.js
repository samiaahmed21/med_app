import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import ProfileCard from "../ProfileCard/ProfileCard";

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [userName, setUserName] = useState("");
  const [showProfileCard, setShowProfileCard] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setMenuActive(!menuActive);
  };

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (email) {
      const name = email.split("@")[0];
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("phone");
    setUserName("");
    navigate("/login");
    window.location.reload();
  };

  const handleProfileClick = () => {
    console.log("Clicked Hi, toggling profile card"); // Debug log
    setShowProfileCard(prev => {
      const newValue = !prev;
      console.log("showProfileCard set to:", newValue); // Debug log
      return newValue;
    });
  };

  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">
          StayHealthy
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="26"
            width="26"
            viewBox="0 0 1000 1000"
            style={{ fill: "#3685fb" }}
          >
            <title>Doctor With Stethoscope SVG icon</title>
            <g>
              <g>
                <path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z" />
                <path d="M499.8,522.8c71.2,0,129.1-58.7,129.1-129.1H370.6C370.6,464.1,428.6,522.8,499.8,522.8z" />
              </g>
            </g>
          </svg>
        </Link>
        <span>.</span>
      </div>
      <div className="nav__icon" onClick={handleClick}>
        <i className={`fa ${menuActive ? "fa-times" : "fa-bars"}`}></i>
      </div>
      <ul className={`nav__links ${menuActive ? "active" : ""}`}>
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="#">Appointments</Link>
        </li>
        <li className="link">
          <Link to="/instant-consultation">
            <button className="btn1">Instant Booking</button>
          </Link>
        </li>
        {userName ? (
          <>
            <li className="welcome-user">
              <span className="welcome-text" onClick={handleProfileClick}>
                Hi, {userName}
              </span>
              {showProfileCard && (
                <div className="profile-card active">
                  <ProfileCard />
                </div>
              )}
            </li>
            <li className="link">
              <button className="btn1" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="link">
              <Link to="/signup">
                <button className="btn1">Sign Up</button>
              </Link>
            </li>
            <li className="link">
              <Link to="/login">
                <button className="btn1">Login</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;