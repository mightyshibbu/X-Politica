import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ textAlign: 'center' }}>
      <h1>Declare Winner</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Post:
            <input
              type="text"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Year:
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Region:
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
            />
          </label>
        </div>
        <br/>
        <button type="submit">Declare Winner</button>
        <br/>
        <button onClick={handleGoBack}>Go Back</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
}

export default DeclareWinnerPage;