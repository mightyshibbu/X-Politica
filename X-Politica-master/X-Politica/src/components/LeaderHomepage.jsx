import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LeaderHomepage() {  
  const [electionRecords, setElectionRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch election records from your API endpoint
    const fetchElectionRecords = async () => {
      try {
        const response = await fetch('http://localhost:3080/getAllElectionRecords'); // Adjust API endpoint if needed
        if (response.ok) {
          const data = await response.json();
          // Filter records where the winner is null
          const filteredRecords = data.filter(record => record.winner === null);
          setElectionRecords(filteredRecords);
          setLoading(false);
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.error('Error fetching election records:', error);
        setError('Error fetching election records: ' + error.message);
        setLoading(false);
      }
    };

    fetchElectionRecords();
  }, []);

  // Function to navigate to registration page
  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <img 
        src="https://www.shutterstock.com/image-illustration/indian-flag-political-symbol-color-638031709" 
        alt="Indian Flag" 
        style={{ width: '100%', maxWidth: '600px', height: 'auto', marginBottom: '20px' }} 
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="election-records">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="records-container">
            {electionRecords.map((record) => (
              <div key={record.eid} className="record">
                <h3>{record.post}</h3>
                <p>Year: {record.year}</p>
                <p>Region: {record.region}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={goToRegister} style={{ marginTop: '20px' }}>
        Register for Election
      </button>

      <style jsx>{`
        .election-records {
              display: flex;
              flex-direction: column;
              align-items: center;
              overflow: hidden;
              position: relative;
              width: 100%;
              max-width: 100vw; /* Ensure full width of the viewport */
              height: 200px; /* Adjust height as needed */
        }
        .records-container {
              display: flex;
              flex-direction: row;
              width: 100%;
              animation: slide 20s linear infinite;
        }
        .record {
           flex: 0 0 auto; /* Ensure each record takes up only as much space as needed */
           margin: 10px;
           padding: 10px;
           border: 1px solid #ddd;
           border-radius: 5px;
           white-space: nowrap;
          background-color: #f9f9f9;
        }
       @keyframes slide {
          0% { transform: translateX(100%); }
         100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}

export default LeaderHomepage;