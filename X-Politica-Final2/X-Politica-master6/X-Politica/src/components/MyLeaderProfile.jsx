import React, { useState, useEffect } from 'react';
import '../css/style.css'; // Import the CSS file
import Header from './Header';

const MyProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    aadhaarNumber: '',
    party: '',   // Add party field
    district: '',
    area: '',
    phone: '',
  });
  const [isChanged, setIsChanged] = useState(false);
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('token')));

  const func = async () => {
    console.log("HELLAAAA");

    try {
      const storedUser = JSON.parse(sessionStorage.getItem('user') || sessionStorage.getItem('data'));
      if (!storedUser || !storedUser._id) {
        throw new Error("User ID not found in session storage");
      }

      const storedUserId = storedUser._id;
      setUserId(storedUserId);
      console.log("USER: ", storedUserId);
      const data=storedUser;
      setFormData({
        name: data.name,
        email: data.email,
        aadhaarNumber: data.aadhaarNumber,
        party: data.party,
        district: data.district,
        area: data.area,
        phone: data.phone,
      });

    } catch (error) {
      console.error('There was an error:', error);
    }
  };

  useEffect(() => {
    func();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => {
      const updatedData = { ...prevState, [name]: value };
      setIsChanged(JSON.stringify(updatedData) !== JSON.stringify(prevState));
      return updatedData;
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update user data via API
      console.log("Updated form data:", formData)
      const response = await fetch(`http://localhost:3080/leader/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('User data updated:', data);
      setIsChanged(false);
      sessionStorage.setItem('user', JSON.stringify(formData)); // Optionally update session storage
      alert("User data updated successfully!");

    } catch (error) {
      console.error('There was an error updating the user data!', error);
    }
  };

  return (
    <div className="mainblock">
      <Header />
      <h1>My Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Aadhaar Number:
          <input
            type="text"
            name="aadhaarNumber"
            value={formData.aadhaarNumber}
            onChange={handleChange}
          />
        </label>
        <label>
          Party:
          <input
            type="text"
            name="party"
            value={formData.party}
            onChange={handleChange}
          />
        </label>
        <label>
          District:
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
          />
        </label>
        <label>
          Area:
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        {isChanged && (
          <button type="submit" className="submit-button">Change</button>
        )}
      </form>
    </div>
  );
};

export default MyProfile;
