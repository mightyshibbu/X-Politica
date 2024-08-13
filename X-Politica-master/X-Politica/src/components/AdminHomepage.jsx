import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminHomepage() {
  const [citizens, setCitizens] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleDetermineWinner = async () => {
     navigate('/winner');
  };
  
  const handleGetAllCitizens = async () => {
    try {
      const response = await fetch('http://localhost:3080/getAllCitizens', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCitizens(data); // Set the state with the fetched data
        setError(null); // Clear any previous errors
      } else {
        setError('Error fetching citizens: ' + response.statusText);
      }
    } catch (error) {
      setError('Error fetching citizens: ' + error.message);
    }
  };

  const handleGetAllLeaders = async () => {
    try {
      const response = await fetch('http://localhost:3080/getAllLeaders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLeaders(data); // Set the state with the fetched data
        setError(null); // Clear any previous errors
      } else {
        setError('Error fetching leaders: ' + response.statusText);
      }
    } catch (error) {
      setError('Error fetching leaders: ' + error.message);
    }
  };

  const handleElectionDeclare = () =>{
    navigate('/electionDeclare');
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <img 
        src="https://www.shutterstock.com/image-illustration/indian-flag-political-symbol-color-638031709"
        alt="Indian Flag"
        style={{ width: '100%', maxWidth: '600px', height: 'auto', marginBottom: '20px' }}
      />
      <div>
        <button 
          onClick={handleGetAllCitizens} 
          style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}
        >
          Get All Citizens
        </button>
        <button 
          onClick={handleGetAllLeaders} 
          style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}
        >
          Get All Leaders
        </button>
        <button 
          onClick={handleElectionDeclare} 
          style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}
        >
          Announce new Election
        </button>
        <button
          onClick={handleDetermineWinner}
          style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}
        >
             Click to close election and declare Winner
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h2>Citizens List:</h2>
        {citizens.length > 0 ? (
            <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '80%' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Email</strong></th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Aadhaar Number</strong></th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}><strong>State</strong></th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}><strong>District</strong></th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Area</strong></th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Role</strong></th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Phone</strong></th>
                </tr>
              </thead>
              <tbody>
                {citizens.map((citizen, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{citizen.email || 'No Email'}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{citizen.aadhaarNumber || 'No Aadhaar Number'}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{citizen.state || 'No State'}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{citizen.district || 'No District'}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{citizen.area || 'No Area'}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{citizen.role || 'No Role'}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{citizen.phone || 'No Phone'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No citizens found</p>
          )}
        </div>
        <div>
        <h2>Leaders List:</h2>
        {leaders.length > 0 ? (
          <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '80%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Name</strong></th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Party</strong></th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Aadhaar Number</strong></th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Area</strong></th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}><strong>District</strong></th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Phone</strong></th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Email</strong></th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Role</strong></th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{leader.name || 'No Name'}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{leader.party || 'No Party'}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{leader.aadhaarNumber || 'No Aadhaar Number'}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{leader.area || 'No Area'}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{leader.district || 'No District'}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{leader.phone || 'No Phone'}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{leader.email || 'No Email'}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{leader.role || 'No Role'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No leaders found</p>
      )}
    </div>
    </div>
  );
}

export default AdminHomepage;
