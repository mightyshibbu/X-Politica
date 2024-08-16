import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/PartyDetails.css'; 

function PartyDetails() {
  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3080/parties')
      .then(response => {
        if (Array.isArray(response.data)) {
          setParties(response.data);
        } else {
          console.error('Unexpected response data:', response.data);
          setError('Unexpected response format');
          setParties([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('API Error:', error.response ? error.response.data : error.message);
        setError('An error occurred while fetching data');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedParty) {
      axios.get(`http://localhost:3080/elections/party/${selectedParty._id}`)
        .then(response => {
          setElections(response.data);
        })
        .catch(error => {
          console.error('API Error:', error.response ? error.response.data : error.message);
          setError('An error occurred while fetching elections');
        });
    }
  }, [selectedParty]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="party-details-container">
      <div className="party-list">
        <h2>Parties</h2>
        <ul>
          {parties.length > 0 ? (
            parties.map(party => (
              <li key={party._id} onClick={() => setSelectedParty(party)}>
                {party.name}
              </li>
            ))
          ) : (
            <li>No parties available</li>
          )}
        </ul>
      </div>
      <div className="party-details">
        {selectedParty ? (
          <div>
            <h2>{selectedParty.name}</h2>
            <p>Established Year: {selectedParty.yearEstablished || 'N/A'}</p>
            <p>Current Head: {selectedParty.currentHeads || 'N/A'}</p>
            <h3>Party Members:</h3>
            <ul>
              {Array.isArray(selectedParty.partyMembers) && selectedParty.partyMembers.length > 0 ? (
                selectedParty.partyMembers.map(member => (
                  <li key={member._id}>{member.name}</li>
                ))
              ) : (
                <li>No members available</li>
              )}
            </ul>
            <h3>Election Details:</h3>
            <div className="election-records">
              {elections.length > 0 ? (
                elections.map(election => (
                  <div
                    key={election._id}
                    className={`election-circle ${election.winner && election.winner._id === selectedParty._id ? 'winner' : ''}`}
                  >
                    <div>
                      <p>Election ID: {election.eid}</p>
                      <p>Post: {election.post}</p>
                      <p>Region: {election.region || 'N/A'}</p>
                      <p>Competing Candidates: {election.competingCandidates.map(candidate => candidate.name).join(', ')}</p>
                      <p>Winner: {election.winner ? election.winner.name : 'N/A'}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div>No election details available</div>
              )}
            </div>
          </div>
        ) : (
          <div>Select a party to see details</div>
        )}
      </div>
    </div>
  );
}

export default PartyDetails