import React, { useState } from 'react';
import './AppointmentForm.css'; // Optional for styling

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phoneNumber || !appointmentDate || !appointmentTime) {
      alert('Please fill out all fields.');
      return;
    }
    onSubmit({ name, phoneNumber, appointmentDate, appointmentTime, doctorName, doctorSpeciality });
    setName('');
    setPhoneNumber('');
    setAppointmentDate('');
    setAppointmentTime('');
  };

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <h3>Book Appointment with {doctorName}</h3>

      <div className="form-group">
        <label htmlFor="name">Patient Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="appointmentDate">Appointment Date:</label>
        <input
          type="date"
          id="appointmentDate"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]} // Disable past dates
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="appointmentTime">Appointment Time:</label>
        <input
          type="time"
          id="appointmentTime"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          required
        />
      </div>

      <button type="submit">Book Now</button>
    </form>
  );
};

export default AppointmentForm;
