import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/style.css'
const LoginC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    if (email === '') {
      setEmailError('Please enter your email');
      isValid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    if (password === '') {
      setPasswordError('Please enter a password');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('The password must be at least 8 characters long');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:3080/loginC', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (response.ok) {
          const {message,data,token} = await response.json();
          const {name} = data;
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('user', JSON.stringify(data)); // Store user info
          sessionStorage.setItem('token', JSON.stringify(token)); // Store user token
          // Redirect to homepage or other protected route
          navigate('/homeC', { state: { message: 'Logged in successfully!', Name:name,token:token } });

        } else {
          alert('Bad Credentials, Try again...')
          console.error('Error logging in:', response.statusText);
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    }
  };

  const onBackButtonClick = () => {
    navigate('/'); // Navigates to the Home component without reloading the page
  };

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Citizen Login</div>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
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
            type="password"
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
          <button className={'button'} type="submit">Log in</button>
          <button className={'button'} type="button" onClick={onBackButtonClick}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default LoginC;
