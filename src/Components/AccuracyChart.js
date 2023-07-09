import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function AccuracyChart({data}) {
  console.log(data)
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain="auto" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Accuracy" stroke="#82ca9d" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    );
  
}

export default AccuracyChart