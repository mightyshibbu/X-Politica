import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PartySignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [yearEstablished, setYearEstablished] = useState('');
  const [currentHeads, setCurrentHeads] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!name) {
      errors.name = 'Name is required';
    }
    if (!yearEstablished || isNaN(yearEstablished)) {
      errors.yearEstablished = 'Year Established is required and must be a number';
    }
    if (yearEstablished < 0) {
      errors.yearEstablished = 'Year Established must be a positive number';
    }
    if (!currentHeads) {
      errors.currentHeads = 'Current Heads are required';
    }
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      console.error('Error:', errors);
      alert('Please fix the errors in the form.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:3080/partySignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          yearEstablished: Number(yearEstablished),
          currentHeads,
          // Party members are not included in this form
        }),
      });

      if (response.ok) {
        navigate('/home', { state: { message: 'Party registered successfully!' } });
      } else {
        console.error('Error creating party:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating party:', error);
    }
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">Party Registration</div>
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
          <label>Year Established:</label>
          <input
            type="number"
            value={yearEstablished}
            onChange={(event) => setYearEstablished(event.target.value)}
            className="inputBox"
          />
          {errors.yearEstablished && <div className="errorLabel">{errors.yearEstablished}</div>}
        </div>
        <div className="inputContainer">
          <label>Current Heads:</label>
          <input
            type="text"
            value={currentHeads}
            onChange={(event) => setCurrentHeads(event.target.value)}
            className="inputBox"
          />
          {errors.currentHeads && <div className="errorLabel">{errors.currentHeads}</div>}
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
  
export default PartySignUp;