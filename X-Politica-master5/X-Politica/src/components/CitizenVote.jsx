import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import logo1 from '../images/logo/logo.png'; 

const statesAndUTs = {
  'Delhi': ['delhi', 'new delhi'],
  'Maharashtra': ['mumbai', 'pune'],
  'Karnataka': ['bengaluru', 'mysuru'],
  // Add more states and union territories with their cities here
};

function CitizenVote() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);
  const [filteredLeaders, setFilteredLeaders] = useState([]);
  const [electionRecords, setElectionRecords] = useState([]);
  const [post, setPost] = useState('');
  const [year, setYear] = useState('');
  const [selectedLeaderName, setSelectedLeaderName] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchElectionRecords = async () => {
      try {
        const response = await fetch('http://localhost:3080/getAllElectionRecords');
        if (response.ok) {
          const data = await response.json();
          // Filter records where the winner is null
          const filteredRecords = data.filter(record => record.winner === null);
          setElectionRecords(filteredRecords);
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.error('Error fetching election records', error);
      }
    };
    fetchElectionRecords();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      const fetchLeaders = async () => {
        try {
          const response = await axios.get(`http://localhost:3080/leaders/${selectedCity}`);
          setFilteredLeaders(response.data);
        } catch (error) {
          console.error('There was an error fetching the leaders!', error);
        }
      };
      fetchLeaders();
    }
  }, [selectedCity]);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setCities(statesAndUTs[state] || []);
    setSelectedCity(''); // Reset city when state changes
    setFilteredLeaders([]); // Clear leaders when state changes
    setSelectedLeaderName(''); // Reset selected leader name
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handlePostChange = (e) => {
    setPost(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleLeaderChange = (e) => {
    setSelectedLeaderName(e.target.value); // Set selected leader name
  };

  const handleGoBack = async () => {
    navigate('/homeC');
  };

  const handleVote = async (leaderName) => {
    try {
      const response = await axios.post('http://localhost:3080/vote', { post, year, leaderName });
  
      if (response.status === 200) {
        alert('Vote recorded successfully');
        navigate('/homeC'); // Redirect to the candidate homepage
      } else {
        alert(response.data.message || 'Error recording vote due to invalid Post or Year Entry');
      }
    } catch (error) {
      console.error('Error handling vote due to invalid Post or Year Entry', error);
      alert('Error handling vote due to invalid Post or Year Entry');
    }
  };

  return (
    <div>
      {/* Header Section with Logo */}
      <div className="header-wrapper mb-4">
        <div className="logo">
          <Link to="/homeL">
            <img className="dark" src={logo1} alt="logo" />
          </Link>
        </div>
      </div>
      
      <div className="container mt-4">
        <h1>Citizen Vote</h1>

        {/* Grid layout for the form and election records */}
        <div className="row">
          {/* Form fields */}
          <div className="col-md-6">
            {/* Dropdowns for state and city */}
            <div className="mb-3">
              <label className="form-label">
                State/Union Territory:
                <select className="form-select" value={selectedState} onChange={handleStateChange}>
                  <option value="">Select a State/UT</option>
                  {Object.keys(statesAndUTs).map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mb-3">
              <label className="form-label">
                City:
                <select className="form-select" value={selectedCity} onChange={handleCityChange} disabled={!cities.length}>
                  <option value="">Select a City</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </label>
            </div>

            {/* Inputs for post and year */}
            <div className="mb-3">
              <label className="form-label">
                Post:
                <input type="text" className="form-control" value={post} onChange={handlePostChange} />
              </label>
              <label className="form-label">
                Year:
                <input type="number" className="form-control" value={year} onChange={handleYearChange} />
              </label>
            </div>

            {/* Display leaders and voting options */}
            <div>
              {filteredLeaders.length > 0 ? (
                <ul className="list-group">
                  {filteredLeaders.map(leader => (
                    <li key={leader._id} className="list-group-item">
                      <strong>Name:</strong> {leader.name}<br />
                      <strong>Party:</strong> {leader.party}<br />
                      <strong>District:</strong> {leader.district}<br />
                      <strong>Area:</strong> {leader.area}<br />
                      <button className="btn btn-primary mt-2" onClick={() => handleVote(leader.name)}>Vote</button> {/* Pass leader name */}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No leaders found for the selected city.</p>
              )}
            </div>
          </div>

          {/* Election Records */}
          <div className="col-md-6">
            <div>
              <h2>Election Records</h2>
              {electionRecords.length > 0 ? (
                <ul className="list-group">
                  {electionRecords.map(record => (
                    <li key={record.eid} className="list-group-item">
                      <strong>Post:</strong> {record.post}<br />
                      <strong>Year:</strong> {record.year}<br />
                      <strong>Region:</strong> {record.region}<br />
                      {/* Other details if needed */}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No election records available.</p>
              )}
            </div>
          </div>
        </div>

        {/* Go Back Button at the Bottom */}
        <div className="d-flex justify-content-center mt-4">
          <button type="button" className="btn btn-secondary" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default CitizenVote;
 