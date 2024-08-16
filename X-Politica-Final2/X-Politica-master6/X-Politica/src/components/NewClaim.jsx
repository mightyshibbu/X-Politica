import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LeaderHeader from './LeaderHeader.jsx';
import ClaimForm from './ClaimForm.jsx';
import MyClaims from './MyClaims.jsx';
import '../css/style.css';
import ClaimDetail from './ClaimDetail.jsx';

const NewClaim = () => {
  const navigate = useNavigate();
  const [claimSubmitted, setClaimSubmitted] = useState(true);
  useEffect(() => {
    const token = sessionStorage.getItem('token'); // Get the JWT token from sessionStorage
    const user = sessionStorage.getItem('user'); // Get the user data from sessionStorage

    if (!token) {
      alert("Log in first!");
      navigate('/'); // Redirect to the login page if not logged in
    } else {
      try {
        const parsedUser = JSON.parse(user);
        const aadhaarNumber = parsedUser.aadhaarNumber; // Extract Aadhaar number from user data
        console.log("fetch(`/myclaims/${aadhaarNumber}` QUERY! : " ,aadhaarNumber)
        // Verify the token or use it in your API request
        fetch(`/myclaims/${aadhaarNumber}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Fetched claims:', data);
          // Handle the data or set it to a state
        })
        .catch(error => {
          console.error('Error fetching claims:', error);
          // Handle errors, e.g., by navigating to an error page
        });

      } catch (error) {
        console.error("Error parsing user or invalid token:", error);
      }
    }
  }, [navigate]);

  return (
    <div style={styles.app}>
      <LeaderHeader />
      <div style={styles.main}>
        <ClaimForm setClaimSubmitted={setClaimSubmitted}/>
        {/* <MyClaims setClaimSubmitted={setClaimSubmitted}/> */}
        {/* <ClaimDetail/> */}
      </div>
    </div>
  );
};

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
  },
  main: {
    display: 'flex', // Use flex layout
    padding: '20px', // Padding inside the container
    marginTop: '5%', // Top margin
    alignItems: 'center', // Align items vertically in the center
    justifyContent: 'center', // Align items horizontally in the center
  }
};

export default NewClaim;
