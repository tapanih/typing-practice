import React from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, ResponsiveContainer, Legend } from 'recharts';
import { ResultType } from '../../../backend/src/types';

type ResultChartProps = {
  results: ResultType[];
}

const ResultChart = ({ results }: ResultChartProps) => {
  return (
    <ResponsiveContainer height={300} width="90%" minWidth={380}>
      <LineChart data={results.reverse()}>
        <XAxis />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        <Line name="WPM" type="monotone" dataKey="wpm" stroke="#8884d8" />
        <Legend verticalAlign="bottom" height={36}/>
      </LineChart>
    </ResponsiveContainer>
  )
}

export default ResultChart;
