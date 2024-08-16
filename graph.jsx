// Assuming you have a data structure like this:
const claimsData = [
    { status: 'approved', count: 10 },
    { status: 'denied', count: 5 },
  ];
  
  // Import necessary libraries
  import React from 'react';
  import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
  
  const ClaimsBarChart = () => {
    return (
      <BarChart width={400} height={300} data={claimsData}>
        <XAxis dataKey="status" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    );
  };
  
  export default ClaimsBarChart;