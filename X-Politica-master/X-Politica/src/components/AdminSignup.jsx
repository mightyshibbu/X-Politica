import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminSignup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!name) {
      errors.name = 'Name is required';
    }
    if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:3080/adminSignup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            password,
            // Add additional fields here if needed
          }),
        });

        if (response.ok) {
          navigate('/homeA', { state: { message: 'Admin Account created successfully! Start by logging in again...' } });
        } else {
          console.error('Error creating admin account:', response.statusText);
        }
      } catch (error) {
        console.error('Error creating admin account:', error);
      }
    }
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">Admin Signup</div>
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="inputBox"
          />
          {errors.name && <div className="errorLabel">{errors.name}</div>}
        </div>
        <div className="inputContainer">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="inputBox"
          />
          {errors.password && <div className="errorLabel">{errors.password}</div>}
        </div>
        <div className="buttonContainer">
          <button type="submit" className="button">
            Submit
          </button>
          <button
            type="button"
            className="button"
            onClick={() => navigate('/')}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminSignup;