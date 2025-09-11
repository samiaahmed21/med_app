import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));

    if (storedUsername) setUsername(storedUsername);
    if (storedDoctorData) setDoctorData(storedDoctorData);
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
      setShowNotification(!storedAppointmentData.canceled);
    }
    if (storedUsername) setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    if (appointmentData?.canceled) setShowNotification(false);
  }, [appointmentData]);

  const createTestAppointment = () => {
    const testUsername = 'John Doe';
    const testDoctor = { name: 'Dr. Smith', speciality: 'Dentist' };
    const testAppointment = {
      name: testUsername,
      phone: '123-456-7890',
      date: '2025-09-12',
      time: '10:30 AM',
      canceled: false
    };

    sessionStorage.setItem('email', testUsername);
    localStorage.setItem('doctorData', JSON.stringify(testDoctor));
    localStorage.setItem(testDoctor.name, JSON.stringify(testAppointment));

    setUsername(testUsername);
    setDoctorData(testDoctor);
    setAppointmentData(testAppointment);
    setIsLoggedIn(true);
    setShowNotification(true);
  };

  const cancelAppointment = () => {
    if (!doctorData || !appointmentData) return;
    const updatedAppointment = { ...appointmentData, canceled: true };
    localStorage.setItem(doctorData.name, JSON.stringify(updatedAppointment));
    setAppointmentData(updatedAppointment);
    setShowNotification(false);
  };

  return (
    <div>
      <Navbar />
      {children}

      {/* Test Appointment Button */}
      <div style={{ margin: '20px' }}>
        <button onClick={createTestAppointment}>
          Test Appointment Notification
        </button>
      </div>

      {/* Notification */}
      {isLoggedIn && showNotification && appointmentData && (
        <div className="notification-container">
          <h3>Appointment Notification</h3>
          <p><strong>Doctor:</strong> {doctorData?.name}</p>
          <p><strong>Speciality:</strong> {doctorData?.speciality}</p>
          <p><strong>Patient Name:</strong> {appointmentData.name}</p>
          <p><strong>Phone Number:</strong> {appointmentData.phone}</p>
          <p><strong>Date of Appointment:</strong> {appointmentData.date}</p>
          <p><strong>Time Slot:</strong> {appointmentData.time}</p>

          <button className="cancel-button" onClick={cancelAppointment}>
            Cancel Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default Notification;
