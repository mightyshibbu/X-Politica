const claimsData = [
    { status: 'approved', count: 10 },
    { status: 'denied', count: 5 },
  ];
  
  // Import necessary libraries
  import React from 'react';
  import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
  
  const COLORS = ['#0088FE', '#00C49F'];
  
  const ClaimsPieChart = () => {
    return (
      <PieChart width={400} height={300}>
        <Pie
          dataKey="count"
          isAnimationActive={false}
          data={claimsData}
          cx={200}
          cy={150}
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {claimsData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    );
  };
  
  export default ClaimsPieChart;