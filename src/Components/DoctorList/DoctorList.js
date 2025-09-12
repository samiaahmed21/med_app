// DoctorList.js
import React, { useState } from 'react';
import DoctorCard from '../DoctorCard/DoctorCard';
import FindDoctorSearch from '../FindDoctorSearch/FindDoctorSearch';
import ReviewForm from '../ReviewForm/ReviewForm';

const doctorsData = [
  { name: 'Dr. Alice Smith', speciality: 'Dentist', experience: 8, ratings: 4.5, profilePic: process.env.PUBLIC_URL + '/images/doc_icon.png' },
  { name: 'Dr. John Doe', speciality: 'Dermatologist', experience: 12, ratings: 4.8, profilePic: process.env.PUBLIC_URL + '/images/doc_icon2.png' },
  { name: 'Dr. Maria Khan', speciality: 'Gynecologist', experience: 10, ratings: 4.7, profilePic: process.env.PUBLIC_URL + '/images/doc_icon3.png' },
];

const DoctorList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const sampleReviews = [
    { doctorName: 'Dr. Alice Smith', speciality: 'Dentist', reviewGiven: false },
    { doctorName: 'Dr. Bob Johnson', speciality: 'General Physician', reviewGiven: false },
    { doctorName: 'Dr. Carol Lee', speciality: 'Gynecologist', reviewGiven: false },
  ];
  const filteredDoctors = doctorsData.filter(doctor =>
    doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ paddingTop: '120px', textAlign: 'center' }}>
  <FindDoctorSearch onSearch={setSearchTerm} />
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
    {filteredDoctors.map((doctor, index) => (
      <DoctorCard key={index} {...doctor} />
    ))}
  </div>
  <ReviewForm reviews={sampleReviews} />
</div>

  );
};

export default DoctorList;
