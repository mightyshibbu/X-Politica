import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLog = () => {
  const [name, setName] = useState(''); // Should be name
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
  
    if (name.trim() === '') {
      setNameError('Please enter your name');
      valid = false;
    } else {
      setNameError('');
    }
  
    if (password.trim() === '') {
      setPasswordError('Please enter a password');
      valid = false;
    } else if (password.length < 8) {
      setPasswordError('The password must be at least 8 characters long');
      valid = false;
    } else {
      setPasswordError('');
    }
    return valid;
  };
  
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:3080/adminL', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, password }), // Correct payload
        });

        if (response.ok) {
          navigate('/homeA', { state: { message: 'Logged in successfully!' } });
        } else {
          const errorData = await response.json();
          console.error('Error logging in:', errorData.message);
          setNameError(errorData.message);
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    }
  };

  const onButtonClick = () => {
    console.log("Login button clicked");
    handleSubmit();
  };

  const onBackButtonClick = () => {
    navigate('/');
  };

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Admin Login</div> {/* Update the text to Admin Login */}
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={name} // Use the correct state variable
          placeholder="Enter your name here"
          onChange={(ev) => setName(ev.target.value)} // Update name state
          className={'inputBox'}
        />
        <label className="errorLabel">{nameError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type='password'
          value={password} // Use password state
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)} // Update password state
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={'Log in'}
        />
        <input
          className={'inputButton'}
          type="button"
          onClick={onBackButtonClick}
          value={'Back'}
        />
      </div>
    </div>
  );
};

export default AdminLog;