import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClaimCard from './ClaimCard';

const PendingClaims = ({ setSelectedClaim }) => {
  const [pendingClaims, setPendingClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(sessionStorage.getItem('data')?sessionStorage.getItem('data'):sessionStorage.getItem('user'))

  const email = user.email;

  const navigate = useNavigate();
  
  const fetchPendingClaims = async () => {
    const token = sessionStorage.getItem('token');
  
    if (!token) {
      alert("Log in first!");
      navigate('/');
      return;
    }
  
    try {
      console.log("User id in PENDING CLAIMS TRY HERE: ",user._id);
      const response = await fetch(`http://localhost:3080/pendingclaims/${user._id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      setPendingClaims(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching claims:', error);
      setError('Failed to load claims');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingClaims();
  }, []);

  if (loading) {
    return <p>Loading claims...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Pending Claims</h2>
      <div style={styles.scrollable}>
  {pendingClaims.length > 0 ? (
    pendingClaims.map((claim, index) => (
      <ClaimCard key={index} claim={claim} setSelectedClaim={setSelectedClaim} />
    ))
  ) : (
    <div style={styles.noClaimsMessage}>
      No pending claims
    </div>
  )}
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
  noClaimsMessage: {
    color: 'green',
    textAlign: 'center',
    fontSize: '18px',
    padding: '20px',
    fontWeight: 'bold',
  }
};

export default PendingClaims;
