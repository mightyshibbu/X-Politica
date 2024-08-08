import Header from './Header'
import ActiveClaims from './ActiveClaims.jsx'
import ClaimDetail from './ClaimDetail'
import React, { useState ,useEffect} from 'react';
import LeaderHeader from './LeaderHeader.jsx';
import ClaimForm from './ClaimForm.jsx';
import {useNavigate, BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import '../css/style.css'
import MyClaims from './MyClaims.jsx';
const NewClaim = () => {
    const [selectedClaim, setSelectedClaim] = useState(null);
    const claims = [
      { title: 'Claim card number 1', description: 'Details about claim card number 1' },
      { title: 'Claim card number 2', description: 'Details about claim card number 2' },
      { title: 'Claim card number 3', description: 'Details about claim card number 3' },
      { title: 'Claim card number 2', description: 'Details about claim card number 2' },
      { title: 'Claim card number 3', description: 'Details about claim card number 3' },
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
      <LeaderHeader />
      <div style={styles.main}>
        
        {/* <ClaimDetail claim={selectedClaim} /> */}
        <ClaimForm/>
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
export default NewClaim
