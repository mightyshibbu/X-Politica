import React from 'react';
import { useNavigate } from 'react-router-dom';

function CitizenHomepage() {
  const navigate = useNavigate();

  const handleVoteClick = () => {
    navigate('/citizenVote'); // Adjust the route based on your setup
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <img 
        src="https://www.shutterstock.com/image-illustration/indian-flag-political-symbol-color-638031709" 
        alt="Indian Flag" 
        style={{ width: '100%', maxWidth: '600px', height: 'auto', marginBottom: '20px' }} 
      />
      <div>
        <button 
          onClick={handleVoteClick}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
        >
          Click to Vote Now
        </button>
      </div>
    </div>
  );
}

export default CitizenHomepage;
