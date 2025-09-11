import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Landing_page from './Components/Landing_Page/Landing_page';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';

function App() {
  return (
    <BrowserRouter>
      <Navbar /> 

      <Routes>
        <Route path="/" element={<Landing_page />} />
        <Route path="/signup" element={<Sign_Up />} />
        <Route path="/login" element={<Login />} />
         <Route path="/instant-consultation" element={<InstantConsultation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
