import React from 'react';

const ClaimCard = ({ claim, setSelectedClaim }) => {
  return (
    <div onClick={() => setSelectedClaim(claim)} style={styles.card}>
      <h3>{claim.title}</h3>
      <p>{claim.description}</p>
      <p><strong>State:</strong> {claim.state}</p>
      <p><strong>District:</strong> {claim.district}</p>
      <p><strong>Area:</strong> {claim.area}</p>
      <p><strong>Active Status:</strong> {claim.activeStatus}</p>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    cursor: 'pointer'
  }
};

export default ClaimCard;
