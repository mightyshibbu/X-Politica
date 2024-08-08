import React from 'react';
import ClaimCard from './ClaimCard';

const ActiveClaims = ({ claims, setSelectedClaim }) => {
  return (
    <div style={styles.container}>
      <h2>Active Claim posts</h2>
      <div style={styles.scrollable}>
        {claims.map((claim, index) => (
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
    padding: '10px'
  },
  scrollable: {
    maxHeight: '400px',
    overflowY: 'auto',
  }
};

export default ActiveClaims;

