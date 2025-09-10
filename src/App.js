// Import necessary modules from React library
import React from 'react';

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar';
import Landing_page from './Components/Landing_Page/Landing_page'; // Fixed import

// Function component for the main App
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* Route for the landing page */}
          <Route path="/" element={<Landing_page />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;
