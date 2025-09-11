import React, { useState } from 'react';
import './FindDoctorSearch.css';

const initSpeciality = [
  'Dentist', 'Gynecologist', 'General Physician', 'Dermatologist', 'ENT Specialist', 'Homeopath', 'Ayurveda'
];

const FindDoctorSearch = ({ onSearch }) => {
  const [searchDoctor, setSearchDoctor] = useState('');
  const [showList, setShowList] = useState(false);

  const handleSelect = (speciality) => {
    setSearchDoctor(speciality);
    setShowList(false);
    if (onSearch) onSearch(speciality);
  };

  return (
    <div className="finddoctor" style={{ position: 'relative', display: 'inline-block' }}>
      <input
        type="text"
        placeholder="Search doctors by specialty"
        value={searchDoctor}
        onFocus={() => setShowList(true)}
        onBlur={() => setTimeout(() => setShowList(false), 100)} // allows click before hiding
        onChange={(e) => {
          setSearchDoctor(e.target.value);
          if (onSearch) onSearch(e.target.value);
        }}
        className="search-doctor-input-box"
      />

      {showList && (
        <div className="search-doctor-input-results">
          {initSpeciality
            .filter(spec => spec.toLowerCase().includes(searchDoctor.toLowerCase()))
            .map(spec => (
              <div key={spec} className="search-doctor-result-item" onMouseDown={() => handleSelect(spec)}>
                <span>{spec}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default FindDoctorSearch;
