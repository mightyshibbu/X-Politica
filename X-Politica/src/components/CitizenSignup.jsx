import React,{ useState } from 'react';
import {useNavigate, BrowserRouter, Routes, Route, Link } from 'react-router-dom'; 

function  CitizenSignup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [area, setArea] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!name) {
      errors.name = 'Name is required';
    }
    if (!aadhaarNumber) {
      errors.aadhaarNumber = 'Aadhaar Number is required';
    } else if (aadhaarNumber.length !== 12) {
      errors.aadhaarNumber = 'Invalid Aadhaar Number';
    }
    if (!area) {
      errors.area = 'Area is required';
    }
    if (!district) {
      errors.district = 'District is required';
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      errors.phone = 'Invalid Phone Number';
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = 'Invalid Email';
    }
    if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      // Display error messages to the user
      console.error('Error:', errors);
      alert(errors)
      navigate('/leaderSignup');
    } else {
      handleSubmit();
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:3080/citizenSignup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
            phone,
            state,
            district,
            area,
            aadhaarNumber: aadhaarNumber,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const person = await data.save();
          req.session.user = person; 
          navigate('/homeC',{  state: {message: 'Account created successfully! Start by logging in again...' ,Name:name}} );
        } else {
          alert('Invalid entries, Try again...')
          console.error('Error creating citizen:', response.statusText);
        }
      } catch (error) {
        console.error('Error creating citizen:', error);
      }
    }
  };

  return (
    <>
    <div className="mainContainer">
      <div className="titleContainer">Citizen Signup</div>
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
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="inputBox"
          />
          {errors.email && <div className="errorLabel">{errors.email}</div>}
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
        <div className="inputContainer">
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="inputBox"
          />
          {errors.phone && <div className="errorLabel">{errors.phone}</div>}
        </div>
        <div className="inputContainer">
          <label>State:</label>
          <input
            type="text"
            value={state}
            onChange={(event) => setState(event.target.value)}
            className="inputBox"
          />
          {errors.state && <div className="errorLabel">{errors.state}</div>}
        </div>
        <div className="inputContainer">
          <label>District:</label>
          <input
            type="text"
            value={district}
            onChange={(event) => setDistrict(event.target.value)}
            className="inputBox"
          />
          {errors.district && <div className="errorLabel">{errors.district}</div>}
        </div>
        <div className="inputContainer">
          <label>Area:</label>
          <input
            type="text"
            value={area}
            onChange={(event) => setArea(event.target.value)}
            className="inputBox"
          />
          {errors.area && <div className="errorLabel">{errors.area}</div>}
        </div>
        <div className="inputContainer">
          <label>Aadhaar Number:</label>
          <input
            type="text"
            value={aadhaarNumber}
            onChange={(event) => setAadhaarNumber(event.target.value)}
            className="inputBox"
          />
          {errors.aadhaarNumber && (
            <div className="errorLabel">{errors.aadhaarNumber}</div>
          )}
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
    </>
  );
}

export default CitizenSignup;