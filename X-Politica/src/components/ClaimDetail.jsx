// src/components/ClaimDetail.js
import {useNavigate, BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import React, { useState } from 'react';
const ClaimDetail = ({ claim }) => {
  if (!claim) return <div style={styles.container}>Select a claim to see details</div>;

  return (
    <div style={styles.container}>
      <h2>Claim Detail</h2>
      <h3>{claim.title}</h3>
      <p>{claim.description}</p>
      <p><strong>Description:</strong> {claim.description}</p>
      <p><strong>Area:</strong> {claim.area}</p>
      <p><strong>District:</strong> {claim.district}</p>
      <p><strong>State:</strong> {claim.state}</p>
      <p><strong>Active Status:</strong> {claim.activeStatus}</p>
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    marginLeft: '10px'
  }
};

export default ClaimDetail;
