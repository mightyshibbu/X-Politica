import Header from './Header'
import ActiveClaims from './ActiveClaims.jsx'
import ClaimDetail from './ClaimDetail'
import React, { useState , useEffect} from 'react';
import {useNavigate, BrowserRouter, Routes, Route, Link } from 'react-router-dom'
const ClaimValidation = () => {
    const [selectedClaim, setSelectedClaim] = useState(null);
    const claims = [
      { title: 'Claim card number 1', description: 'Details about claim card number 1' },
      { title: 'Claim card number 2', description: 'Details about claim card number 2' },
      { title: 'Claim card number 3', description: 'Details about claim card number 3' },
      { title: 'Claim card number 4', description: 'Details about claim card number 4' },
      { title: 'Claim card number 5', description: 'Details about claim card number 5' },
      { title: 'Claim card number 6', description: 'Details about claim card number 6' },
      { title: 'Claim card number 7', description: 'Details about claim card number 7' },
      { title: 'Claim card number 8', description: 'Details about claim card number 8' },
      { title: 'Claim card number 9', description: 'Details about claim card number 9' },
      { title: 'Claim card number 10', description: 'Details about claim card number 10' }
      // Add more claims as needed CLAIM LIST
    ];
    const navigate = useNavigate();
    useEffect(() => {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn'); // Assuming you store login state in sessionStorage
      if (!isLoggedIn) {
        alert("Log in first!")
        navigate('/'); // Redirect to the login page if not logged in
      }
    }, [navigate]);
  return (
    <div style={styles.app}>
      <Header />
      <div style={styles.main}>
        <ActiveClaims claims={claims} setSelectedClaim={setSelectedClaim} />
        <ClaimDetail claim={selectedClaim} />
      </div>
    </div>
  )
}
const styles = {
    app: {
      fontFamily: 'Arial, sans-serif',
    },
    main: {
      display: 'flex',
      padding: '20px',
    }
  };
export default ClaimValidation
