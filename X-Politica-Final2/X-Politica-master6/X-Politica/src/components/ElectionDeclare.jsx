import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS
import logo1 from '../images/logo/logo.png'; // Import your logo image

const ElectionDeclarepage = () => {
  const navigate = useNavigate();
  
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
    event.preventDefault();
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
    <div className="container mt-4">
      {/* Header with logo */}
      <div className="header-wrapper mb-4">
        <div className="logo">
          <Link to="/homeL">
            <img className="dark" src={logo1} alt="logo" />
          </Link>
        </div>
      </div>

      <h1>Declare Election</h1>

      {/* Form Section */}
      <section className="form-section mt-4">
        <form onSubmit={handleSubmit}>
          <div className="inputContainer mb-3">
            <label>Post:</label>
            <select
              value={post}
              onChange={(event) => setPost(event.target.value)}
              className="inputBox form-control"
            >
              <option value="">Select Post</option>
              <option value="prime minister">Prime Minister</option>
              <option value="chief minister">Chief Minister</option>
              <option value="mayor">Mayor</option>
            </select>
            {errors.post && <div className="errorLabel text-danger">{errors.post}</div>}
          </div>
          <div className="inputContainer mb-3">
            <label>Year:</label>
            <input
              type="number"
              value={year}
              onChange={(event) => setYear(event.target.value)}
              className="inputBox form-control"
            />
            {errors.year && <div className="errorLabel text-danger">{errors.year}</div>}
          </div>
          <div className="inputContainer mb-3">
            <label>Region:</label>
            <input
              type="text"
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              className="inputBox form-control"
            />
            {errors.region && <div className="errorLabel text-danger">{errors.region}</div>}
          </div>
          <div className="buttonContainer">
            <button type="submit" className="button btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              className="button btn btn-secondary"
              onClick={() => navigate('/homeA')}
            >
              Back
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ElectionDeclarepage;