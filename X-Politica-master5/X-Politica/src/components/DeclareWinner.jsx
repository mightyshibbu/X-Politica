import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS
import logo1 from '../images/logo/logo.png'; // Import your logo image

function DeclareWinnerPage() {
  const [post, setPost] = useState('');
  const [year, setYear] = useState('');
  const [region, setRegion] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  
  const handleGoBack = async () => {
    navigate('/homeA');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3080/declareWinner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post, year, region }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setError(null);
      } else {
        setError('Error declaring winner: ' + response.statusText);
        setMessage(null);
      }
    } catch (error) {
      setError('Error declaring winner: ' + error.message);
      setMessage(null);
    }
  };

  return (
    <div className="container mt-4">
      {/* Header with logo */}
      <header className="mb-4">
        <div className="header-wrapper text-center">
          <div className="logo">
            <Link to="/homeL">
              <img className="dark logo-large" src={logo1} alt="logo" />
            </Link>
          </div>
        </div>
      </header>

      <h1 className="mb-4">Declare Winner</h1>
      
      <form onSubmit={handleSubmit} className="form-group">
        <div className="mb-3">
          <label className="form-label">Post:</label>
          <input
            type="text"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Year:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Region:</label>
          <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="d-flex justify-content-center mb-3">
          <button type="submit" className="btn btn-primary mx-2">
            Declare Winner
          </button>
          <button type="button" className="btn btn-secondary mx-2" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </form>
      {error && <p className="text-danger">{error}</p>}
      {message && <p className="text-success">{message}</p>}
    </div>
  );
}

export default DeclareWinnerPage;