import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/style.css'; // Import your CSS files
import '../css/swiper-bundle.min.css';
import logo1 from '../images/logo/logo.png'; // Import your images
import avatar from '../images/avatar.png';
import AdminHeader from './AdminHeader';
import Corousel from './Corousel';

function AdminHomepage() {
  const [citizens, setCitizens] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  return (
    <>
      <AdminHeader />
      <Corousel/>
      <div className="container mt-4">
        {/* Navigation Buttons */}
        <div style={{ marginBottom: '20px' }}>
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
        </div>

        {/* Error Display */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Citizens Table */}
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

        {/* Leaders Table */}
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
    </>
  );
}

export default AdminHomepage;