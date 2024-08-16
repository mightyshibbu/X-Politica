import React, { useState, useEffect } from 'react';
import '../css/style.css'; // Import the CSS file
import Header from './Header';

const MyProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    aadhaarNumber: '',
    state: '',
    district: '',
    area: '',
    phone: '',
  });
  const [isChanged, setIsChanged] = useState(false);// Assuming you have user ID in session storage
  const [userId, setUserId] = useState('');
const storedUser = JSON.parse(sessionStorage.getItem('user') || sessionStorage.getItem('data'));
const storedUserId=storedUser._id;
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('token')));
  const func = async () => {
    console.log("HELLAAAA");

    try {
      if (!storedUser || !storedUser._id) {
        throw new Error("User ID not found in session storage");
      }

      const storedUserId = storedUser._id;
      setUserId(storedUserId);
      console.log("USER: ", storedUserId);


        setFormData({
            name: storedUser.name,
            email: storedUser.email,
            aadhaarNumber: storedUser.aadhaarNumber,
            state: storedUser.state,
            district: storedUser.district,
            area: storedUser.area,
            phone: storedUser.phone
            
        })

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
      setIsChanged(JSON.stringify(updatedData) !== JSON.stringify(formData));
      return updatedData;
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user data via API
    fetch(`http://localhost:3080/citizen/${storedUserId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization':token
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('User data updated:', data);
        setIsChanged(false);
        sessionStorage.setItem('user', JSON.stringify(formData)); // Optionally update session storage
        alert("User data updated successfully!")
        
    })
      .catch(error => {
        console.error('There was an error updating the user data!', error);
      });
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
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
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
