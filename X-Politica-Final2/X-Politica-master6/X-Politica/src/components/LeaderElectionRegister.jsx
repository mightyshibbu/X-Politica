import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import logo1 from '../images/logo/logo.png';
import LeaderHeader from './LeaderHeader';

function LeaderElectionRegister() {
    const [leaderName, setLeaderName] = useState('');
    const [area, setArea] = useState('');
    const [post, setPost] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [electionRecords, setElectionRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchElectionRecords = async () => {
            try {
                const response = await fetch('http://localhost:3080/getAllElectionRecords');
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
    }, []); // Empty dependency array to run only once on mount
    
    const handleGoBack = async () => {
        navigate('/homeL');
      };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3080/Electionregister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ leaderName, area, post, year }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
                setError('');
                // Redirect to LeaderHomepage on successful registration
                navigate('/homeL');
            } else {
                const errorData = await response.json();
                setError(errorData.message);
                setMessage('');
            }
        } catch (error) {
            setError('Error registering election: ' + error.message);
            setMessage('');
        }
    };

    return (
        <div className="container mt-4">
            {/* Header with logo */}
            <LeaderHeader/>
            <h1>Register for Election</h1>

            {/* Registration and Election Records side-by-side */}
            <div className="row">
                {/* Registration form */}
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="mb-3">
                            <label className="form-label">
                                Leader Name:
                                <input
                                    type="text"
                                    className="form-control"
                                    value={leaderName}
                                    onChange={(e) => setLeaderName(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Area:
                                <input
                                    type="text"
                                    className="form-control"
                                    value={area}
                                    onChange={(e) => setArea(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Post:
                                <select
                                    className="form-select"
                                    value={post}
                                    onChange={(e) => setPost(e.target.value)}
                                    required
                                >
                                    <option value="">Select Post</option>
                                    <option value="prime minister">Prime Minister</option>
                                    <option value="chief minister">Chief Minister</option>
                                    <option value="mayor">Mayor</option>
                                </select>
                            </label>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Year:
                                <input
                                    type="number"
                                    className="form-control"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                        <button type="button" className="btn btn-secondary mx-2" onClick={handleGoBack}>
                                  Go Back
                        </button>
                        {message && <p className="text-success mt-3">{message}</p>}
                        {error && <p className="text-danger mt-3">{error}</p>}
                    </form>
                </div>

                {/* Election records */}
                <div className="col-md-6 mt-4 mt-md-0">
                    <section className="election-records">
                        <h2>Election Records</h2>
                        {loading && <p>Loading...</p>}
                        {error && <p className="text-danger">{error}</p>}
                        {electionRecords.length === 0 && !loading && <p>No elections available.</p>}
                        <div className="row">
                            {electionRecords.map(record => (
                                <div key={record.eid} className={`col-md-12 mb-3 ${record.post === 'chief minister' ? 'bg-light border border-primary' : ''}`}>
                                    <div className="card p-3">
                                        <h3 className="card-title">{record.post.charAt(0).toUpperCase() + record.post.slice(1)}</h3>
                                        <p className="card-text">Year: {record.year}</p>
                                        <p className="card-text">Region: {record.region.charAt(0).toUpperCase() + record.region.slice(1)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default LeaderElectionRegister;