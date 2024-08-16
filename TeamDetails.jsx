import React from 'react';

const teamMembers = [
  { name: 'Pranav Tripathi', role: 'Full-Stack Developer', affiliation: 'CDAC ACTS 2024 (I)' },
  { name: 'Vinayak Shankar', role: 'Full-Stack Developer', affiliation: 'CDAC ACTS 2024 (I)' },
  { name: 'Pradumna Narkhede', role: 'Full-Stack Developer', affiliation: 'CDAC ACTS 2024 (I)' },
  { name: 'Saaril Shah', role: 'Full-Stack Developer', affiliation: 'CDAC ACTS 2024 (I)' },
];

const TeamDetails = () => {
  return (
    <div className="team-details-container">
      <h1>Team Members 👥</h1>
      <ul>
        {teamMembers.map((member, index) => (
          <li key={index}>
            <h2>{member.name}</h2>
            <p>{member.role}</p>
            <p>{member.affiliation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamDetails;