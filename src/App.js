import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing_Page from './Components/Landing_Page/Landing_page';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import DoctorList from './Components/DoctorList/DoctorList';
import Notification from './Components/Notification/Notification';
import ProfileCard from './Components/ProfileCard/ProfileCard';
import ReportLayout from './Components/ReportLayout';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
          <Routes>
            <Route path="/" element={<Landing_Page />} />
            <Route path="/signup" element={<Sign_Up />} />
            <Route path="/login" element={<Login />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
            <Route path="/doctors" element={<DoctorList />} />
            <Route path="/profile" element={<ProfileCard />} />
            <Route path="/reports" element={<ReportLayout />} />          
            </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
