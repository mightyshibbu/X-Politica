// src/components/MyClaims.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import ClaimCard from './ClaimCard';

const MyClaims = ({ setSelectedClaim }) => {
  const [myclaims, setMyClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [claimSubmitted, setClaimSubmitted] = useState(true);
  const navigate = useNavigate(); // Initialize the navigate function

  const func = async () =>{
    const token = sessionStorage.getItem('token');
    const user = sessionStorage.getItem('user')?sessionStorage.getItem('user'):sessionStorage.getItem('data');
    console.log("INSIDE func in MyClaims")
    if (!token) {
      alert("Log in first!");
      navigate('/');
      return;
    }
    
    console.log("INSIDE MyCLAIMS/ token:",token)
    try {
      const parsedUser = JSON.parse(user);
      const aadhaarNumber = parsedUser.aadhaarNumber;
      console.log("aadhaarNumber:",aadhaarNumber)
      // Fetch claims from the backend using the user's Aadhaar number
      fetch(`http://localhost:3080/myclaims/${aadhaarNumber}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        // Check if the response is JSON or not
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Expected JSON, got " + contentType);
        }
        return response.json();
      })
      .then(data => {
        setMyClaims(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching claims:', error);
        setError('Failed to load claims');
        setLoading(false);
      });
    } catch (error) {
      console.error('Error parsing user from sessionStorage:', error);
      alert("Invalid session. Please log in again.");
      sessionStorage.removeItem('token');
      navigate('/');
    }
  }
  useEffect(() => {
    if (claimSubmitted) {
      func();
    }
  }, [claimSubmitted]);
  if (loading) {
    return <p>Loading claims...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h2>My Claims</h2>
      <div style={styles.scrollable}>
        {myclaims && myclaims.length > 0 ? (
          myclaims.map((claim, index) => (
            <ClaimCard key={index} claim={claim} setSelectedClaim={setSelectedClaim} />
          ))
        ) : (
          <p>No claims found.</p>
        )}
      </div>
    </div>
  );
};
const styles = {
  container: {
    flex: 2,
    marginRight: '1%',
    marginLeft: '9%',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    height: '100vh', // Make the container height equal to the viewport height
    boxSizing: 'border-box', // Ensures padding and border are included in the width and height
  },
  scrollable: {
    height: 'calc(100vh - 20px)', // Subtract the padding from the container height
    overflowY: 'auto',
    paddingBottom: '0px', // Remove padding from the bottom
  }
};

export default MyClaims;
