import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClaimCard from './ClaimCard';

const ActiveClaims = ({ setSelectedClaim }) => {
  const [activeClaims, setActiveClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(sessionStorage.getItem('data')?sessionStorage.getItem('data'):sessionStorage.getItem('user'))

  const email = user.email;

  const navigate = useNavigate();
  
  const fetchActiveClaims = async () => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      alert("Log in first!");
      navigate('/');
      return;
    }

    try {
      const response = await fetch('http://localhost:3080/activeclaims', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setActiveClaims(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching claims:', error);
      setError('Failed to load claims');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveClaims();
  }, []);

  if (loading) {
    return <p>Loading claims...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h2>View responded claims</h2>
      <div style={styles.scrollable}>
        {activeClaims.map((claim, index) => (
          <ClaimCard key={index} claim={claim} setSelectedClaim={setSelectedClaim} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    marginRight: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    height: '100vh', // Make container full screen height
    boxSizing: 'border-box',
  },
  scrollable: {
    height: 'calc(100vh - 40px)', // Adjust height to subtract padding and other elements
    overflowY: 'auto',
    paddingBottom: '0px',
  },
};

export default ActiveClaims;
