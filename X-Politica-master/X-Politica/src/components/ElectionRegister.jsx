import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function ElectionRegister() {
    const [leaderName, setLeaderName] = useState('');
    const [area, setArea] = useState('');
    const [post, setPost] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize navigate

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
        <div>
            <h1>Register for Election</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Leader Name:
                        <input type="text" value={leaderName} onChange={(e) => setLeaderName(e.target.value)} required />
                    </label>
                </div>
                <div>
                    <label>
                        Area:
                        <input type="text" value={area} onChange={(e) => setArea(e.target.value)} required />
                    </label>
                </div>
                <div>
                    <label>
                        Post:
                        <select value={post} onChange={(e) => setPost(e.target.value)} required>
                            <option value="">Select Post</option>
                            <option value="prime minister">Prime Minister</option>
                            <option value="chief minister">Chief Minister</option>
                            <option value="mayor">Mayor</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Year:
                        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
                    </label>
                </div>
                <button type="submit">Register</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default ElectionRegister;