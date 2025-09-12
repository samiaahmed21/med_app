// Import necessary modules from React and React Router
import React, { useEffect, useState } from "react";
import { API_URL } from '../../config/config';
import { useNavigate } from "react-router-dom";

// Define the ProfileCard component
const ProfileCard = () => {
  // State to store fetched user details
  const [userDetails, setUserDetails] = useState({});
  // State to store updated details while editing
  const [updatedDetails, setUpdatedDetails] = useState({});
  // State to track edit mode toggle
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();

  // Fetch user profile data when component mounts
  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  // Function to fetch user profile from API
  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      if (!authtoken) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/user`, {
        headers: {
          Authorization: `Bearer ${authtoken}`,
          Email: email,
        },
      });

      if (response.ok) {
        const user = await response.json();
        setUserDetails(user);
        setUpdatedDetails(user);
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Enable edit mode
  const handleEdit = () => {
    setEditMode(true);
  };

  // Handle input changes for editable fields
  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");
  
      if (!authtoken || !email) {
        navigate("/login");
        return;
      }
  
      const payload = { ...updatedDetails };
  
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          Email: email,
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        // Update session storage and state
        sessionStorage.setItem("name", updatedDetails.name);
        sessionStorage.setItem("phone", updatedDetails.phone);
  
        setUserDetails(updatedDetails);
        setEditMode(false);
        alert("Profile Updated Successfully!");
        navigate("/");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating the profile. Please try again.");
    }
  };
  // Render the profile card
  return (
    <div className="pageWrapper">
      <div className="container">
        {editMode ? (
          <form className="form" onSubmit={handleSubmit}>
            <h2 className="heading">Edit Profile</h2>
  
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={userDetails.email || ""}
              disabled
            />
  
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={updatedDetails.name || ""}
              onChange={handleInputChange}
            />
  
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={updatedDetails.phone || ""}
              onChange={handleInputChange}
            />
  
            <button type="submit">Save</button>
          </form>
        ) : (
          <div className="details">
            <h2 className="heading">Welcome, {userDetails.name}</h2>
            <p>
              <b>Email:</b> {userDetails.email}
            </p>
            <p>
              <b>Phone:</b> {userDetails.phone}
            </p>
            <button onClick={handleEdit}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
  
};

// Export the ProfileCard component
export default ProfileCard;
