import React, { useState } from 'react';
import Header from './Header';
import ActiveClaims from './ActiveClaims';
import ViewClaimDetail from './ViewClaimDetail';
import { useNavigate } from 'react-router-dom';

const ClaimValidation = () => {
  const [selectedClaim, setSelectedClaim] = useState(null);

  return (
    <div style={styles.app}>
      <Header />
      <div style={styles.main}>
        <ActiveClaims setSelectedClaim={setSelectedClaim} />
        <ViewClaimDetail claim={selectedClaim} />
      </div>
    </div>
  );
};

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
  },
  main: {
    display: 'flex',
    padding: '20px',
    height: '100vh',
  },
};

export default ClaimValidation;
