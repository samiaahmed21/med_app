import React, { useState, useRef, useEffect } from 'react';
import './FindDoctorSearch.css';
import { useNavigate } from 'react-router-dom';

const initSpeciality = [
    'Dentist', 'Gynecologist/Obstetrician', 'General Physician',
    'Dermatologist', 'ENT Specialist', 'Homeopath', 'Ayurveda'
];

const FindDoctorSearch = () => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities, setSpecialities] = useState(initSpeciality);
    const navigate = useNavigate();
    const wrapperRef = useRef(null);

    // Hide dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setDoctorResultHidden(true);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        navigate(`/instant-consultation?speciality=${speciality}`);
        window.location.reload();
    };

    return (
        <div className='finddoctor'>
            <center>
                <h1>Find a doctor and Consult instantly</h1>
                <div className="home-search-container">
                    <div className="doctor-search-box" ref={wrapperRef}>
                        <input 
                            type="text" 
                            className="search-doctor-input-box" 
                            placeholder="Search doctors, clinics, hospitals, etc." 
                            onFocus={() => setDoctorResultHidden(false)} 
                            value={searchDoctor} 
                            onChange={(e) => setSearchDoctor(e.target.value)} 
                        />
                        <div className="findiconimg">
                            <img src={process.env.PUBLIC_URL + '/images/search.svg'} alt="search" />
                        </div>
                        {!doctorResultHidden && (
                            <div className="search-doctor-input-results">
                                {specialities
                                    .filter(s => s.toLowerCase().includes(searchDoctor.toLowerCase()))
                                    .map(speciality => (
                                        <div 
                                            className="search-doctor-result-item" 
                                            key={speciality} 
                                            onMouseDown={() => handleDoctorSelect(speciality)}
                                        >
                                            <span>{speciality}</span>
                                            <span>SPECIALITY</span>
                                        </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </center>
        </div>
    );
};

export default FindDoctorSearch;
