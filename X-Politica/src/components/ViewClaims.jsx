import React, { useState } from 'react';
import Header from './Header';
import ActiveClaims from './ActiveClaims';
import ClaimDetail from './ClaimDetail';
import { useNavigate } from 'react-router-dom';
import PendingClaims from './PendingClaims';

const ViewClaims = () => {
  const [selectedClaim, setSelectedClaim] = useState(null);

  return (
    <div style={styles.app}>
      <Header />
      <div style={styles.main}>
        <PendingClaims setSelectedClaim={setSelectedClaim} />
        <ClaimDetail claim={selectedClaim} />
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

export default ViewClaims;
