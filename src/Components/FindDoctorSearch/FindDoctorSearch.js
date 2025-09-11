// FindDoctorSearch.js
import React, { useState } from 'react';
import './FindDoctorSearch.css';

const initSpeciality = [
  'Dentist', 
  'Gynecologist/Obstetrician', 
  'General Physician', 
  'Dermatologist', 
  'Ear-Nose-Throat (ENT) Specialist', 
  'Homeopath', 
  'Ayurveda'
];

const FindDoctorSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (speciality) => {
    setSearchTerm(speciality);
    setShowResults(false);
    onSearch(speciality);
  };

  const filteredSpecialities = initSpeciality.filter(s =>
    s.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="finddoctor">
      <center>
        <h2>Find a doctor</h2>
        <div className="home-search-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="doctor-search-box">
            <input
              type="text"
              className="search-doctor-input-box"
              placeholder="Search doctors, clinics, hospitals, etc."
              onFocus={() => setShowResults(true)}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                onSearch(e.target.value); // update parent as typing
              }}
            />
            <div className="search-doctor-input-results" hidden={!showResults}>
              {filteredSpecialities.map((speciality) => (
                <div
                  className="search-doctor-result-item"
                  key={speciality}
                  onMouseDown={() => handleSelect(speciality)}
                >
                  <span>{speciality}</span>
                  <span>SPECIALITY</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default FindDoctorSearch;
