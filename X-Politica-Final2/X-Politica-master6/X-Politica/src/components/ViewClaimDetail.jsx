import React, { useState } from 'react';

const ViewClaimDetail = ({ claim }) => {
  const token = sessionStorage.getItem('token');
  const user = JSON.parse(sessionStorage.getItem('data')?sessionStorage.getItem('data'):sessionStorage.getItem('user'));

  if (!claim) return <div style={styles.container}>Select a claim to see details</div>;

  // Check if the user has approved or denied the claim
  const isApproved = claim.citizensApproved.includes(user._id);
  const isDenied = claim.citizensDenied.includes(user._id);

  return (
    <div style={styles.container}>
      <h2>View Responded Claims</h2>
      <h3>{claim.title}</h3>
      <p>{claim.description}</p>
      <p><strong>Description:</strong> {claim.description}</p>
      <p><strong>Area:</strong> {claim.area}</p>
      <p><strong>District:</strong> {claim.district}</p>
      <p><strong>State:</strong> {claim.state}</p>
      <p><strong>Active Status:</strong> {claim.activeStatus}</p>
      
      {/* Display status based on user's response */}
      {isApproved && <p style={{ ...styles.status, color: 'green' }}>APPROVED</p>}
      {isDenied && <p style={{ ...styles.status, color: 'red' }}>DENIED</p>}
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    marginLeft: '12px',
  },
  status: {
    fontWeight: 'bold',
    marginTop: '20px',
  },
};

export default ViewClaimDetail;
