import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ElectionDeclarepage() {
  const navigate = useNavigate();
  
  // Initialize states for only the necessary fields
  const [post, setPost] = useState('');
  const [year, setYear] = useState('');
  const [region, setRegion] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!post) {
      errors.post = 'Post is required';
    }
    if (!year || isNaN(year) || year <= 0) {
      errors.year = 'Valid year is required';
    }
    if (!region) {
      errors.region = 'Region is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:3080/electionDeclare', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            post,
            year,
            region,
            // Note: No need to include `competingCandidates` and `winner` in the request body
          }),
        });

        if (response.ok) {
          navigate('/homeA', { state: { message: 'Election declared successfully!' } });
        } else {
          console.error('Error declaring election:', response.statusText);
        }
      } catch (error) {
        console.error('Error declaring election:', error);
      }
    }
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">Declare Election</div>
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label>Post:</label>
          <select
            value={post}
            onChange={(event) => setPost(event.target.value)}
            className="inputBox"
          >
            <option value="">Select Post</option>
            <option value="prime minister">Prime Minister</option>
            <option value="chief minister">Chief Minister</option>
            <option value="mayor">Mayor</option>
          </select>
          {errors.post && <div className="errorLabel">{errors.post}</div>}
        </div>
        <div className="inputContainer">
          <label>Year:</label>
          <input
            type="number"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className="inputBox"
          />
          {errors.year && <div className="errorLabel">{errors.year}</div>}
        </div>
        <div className="inputContainer">
          <label>Region:</label>
          <input
            type="text"
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            className="inputBox"
          />
          {errors.region && <div className="errorLabel">{errors.region}</div>}
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
};

export default ElectionDeclarepage;