import React, { useState } from 'react';

const ClaimDetail = ({ claim }) => {
  const [approvals, setApprovals] = useState(claim ? claim.approvals : 0);
  const [denials, setDenials] = useState(claim ? claim.denials : 0);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const token = sessionStorage.getItem('token');
  const user = JSON.parse(sessionStorage.getItem('data')?sessionStorage.getItem('data'):sessionStorage.getItem('user'));
  console.log("User:",user)
  const updateClaim = async (updatedFields) => {
    try {
      console.log("in up date claims :" , claim._id);
      console.log("User _id:",user._id)
      console.log("UpdatedFields:",updatedFields)
      const response = await fetch(`http://localhost:3080/claims/${claim._id}/${user._id}`,
        
        {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          updatedFields:updatedFields,
          approvals:approvals
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update claim');
      }

      const updatedClaim = await response.json();
      console.log("HAUHAUAHUAHUAHUAHUA updatedClaim",updatedClaim);
    } catch (error) {
      console.error('Error updating claim:', error);
    }
  };

  const updateCitizen = async (citizenId, claimId, approved) => {
    try {
      const response = await fetch(`http://localhost:3080/citizens/${citizenId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          claimId: claimId,
          approved: approved
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update citizen');
      }

      const updatedCitizen = await response.json();
      console.log("updatedCitizen", updatedCitizen);
    } catch (error) {
      console.error('Error updating citizen:', error);
    }
  };

  const handleApprove = () => {
    alert("Sure? You are approving the claim!");
    const updatedFields = { approvals: claim.approvals + 1 };
    updateClaim(updatedFields);
  
    const citizenId = JSON.parse(sessionStorage.getItem('data')?sessionStorage.getItem('data'):sessionStorage.getItem('user'))._id;
    updateCitizen(citizenId, claim._id, true);
    setSelectedResponse('approved');
  };
  
  const handleDeny = () => {
    alert("Sure? You are denying the claim!");
    const updatedFields = { denials: claim.denials + 1 };
    console.log("updatedFields: ",updatedFields)
    updateClaim(updatedFields);
  
    const citizenId = JSON.parse(sessionStorage.getItem('data'))._id;
    updateCitizen(citizenId, claim._id, false);
    setSelectedResponse('denied');
  };
  

  const handleClearResponse = () => {
    setSelectedResponse(null);
  };

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

      <div style={styles.buttonContainer}>
        {selectedResponse === 'approved' ? (
          <button style={{ ...styles.button, backgroundColor: 'green', color: 'white' }} disabled>
            APPROVED
          </button>
        ) : (
          <button
            onClick={handleApprove}
            style={{ ...styles.button, backgroundColor: selectedResponse ? 'lightgrey' : '#007bff' }}
            disabled={!!selectedResponse}
          >
            Approve
          </button>
        )}

        {selectedResponse === 'denied' ? (
          <button style={{ ...styles.button, backgroundColor: 'red', color: 'white' }} disabled>
            DENIED
          </button>
        ) : (
          <button
            onClick={handleDeny}
            style={{ ...styles.button, backgroundColor: selectedResponse ? 'lightgrey' : '#007bff' }}
            disabled={!!selectedResponse}
          > 
            Deny
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    marginLeft: '10px',
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    border: '1px solid #007bff',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default ClaimDetail;
