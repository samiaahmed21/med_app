import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css'; // Make sure to create this file

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(false); // Controls visibility

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (storedDoctorData) setDoctorData(storedDoctorData);

    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
      setShowNotification(true); // Show notification if appointment exists
    }
  }, []);

  // Hide notification if appointment is canceled
  useEffect(() => {
    if (appointmentData?.canceled) {
      setShowNotification(false);
    }
  }, [appointmentData]);

  return (
    <div>
      <Navbar />
      {children}

      {/* Notification container */}
      {isLoggedIn && showNotification && appointmentData && (
        <div className="notification-container">
          <h3>Appointment Notification</h3>
          <p><strong>Patient:</strong> {username}</p>
          <p><strong>Doctor:</strong> {doctorData?.name}</p>
          <p><strong>Date:</strong> {appointmentData.date}</p>
          <p><strong>Time:</strong> {appointmentData.time}</p>
        </div>
      )}
    </div>
  );
};

export default Notification;
