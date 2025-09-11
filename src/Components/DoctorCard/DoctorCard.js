// DoctorCard.js
import React from 'react';
import './DoctorCard.css';

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  return (
    <div className="doctor-card-container">
      <div className="doctor-card-profile-image-container">
        <img src={profilePic} alt={name} />
      </div>
      <div className="doctor-card-details">
        <div className="doctor-card-detail-name">{name}</div>
        <div className="doctor-card-detail-speciality">{speciality}</div>
        <div className="doctor-card-detail-experience">{experience} years</div>
        <div className="doctor-card-detail-ratings">{ratings} ★</div>
      </div>
    </div>
  );
};

export default DoctorCard;
