import React, { useState } from 'react';
const ClaimCard = ({claim,setSelectedClaim}) => {
  return (
    <div style={styles.card} onClick={() => setSelectedClaim(claim)}>
      <h3>{claim.title}</h3>
    </div>
  );
};

const styles = {
  card: {
    background: '#f4f4f4',
    padding: '10px',
    margin: '10px 0',
    cursor: 'pointer',
    border: '1px solid #ccc',
    borderRadius: '5px'
  }
};

export default ClaimCard;
