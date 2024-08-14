import React, { useState } from 'react';
import {useNavigate, BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import '../css/style.css'
const loginL = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const onButtonClick = () => {
    // Reset errors
    setEmailError('');
    setPasswordError('');

    // Validation
    if (email === '') {
      setEmailError('Please enter your email');
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    if (password === '') {
      setPasswordError('Please enter a password');
      return;
    }

    if (password.length < 8) {
      setPasswordError('The password must be at least 8 characters long');
      return;
    }

    // Handle successful login (e.g., redirect to another page)
    handleSubmit();
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3080/loginL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      if (response.ok) {
        // Assuming data is an object with a Name property
        const { data , token } = await response.json();
        const userName = data.name; // Extract the Name property from data
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('user', JSON.stringify(data)); // Store user info
        sessionStorage.setItem('token', JSON.stringify(token)); // Store user info
        console.log("Inside success LoginL: UserName: ",userName)
        navigate('/homeL', { state: { message: 'Logged in successfully!', name: userName ,token:token} });
      } else {
        alert('Bad Credentials, Try again...')
        console.error('Error logging in:', response.statusText);
        
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const onBackButtonClick = () => {
    navigate('/'); // Navigates to the Home component without reloading the page
  };

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Leader Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type='password'
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'button'} type="button" onClick={onButtonClick} value={'Log in'} />
        <input className={'button'} type="button" onClick={onBackButtonClick} value={'Back'} />
      </div>
    </div>
  );
};

export default loginL;