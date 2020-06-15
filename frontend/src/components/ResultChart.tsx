import React from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Label, ResponsiveContainer } from 'recharts';
import { ResultType } from '../../../backend/src/types';

type ResultChartProps = {
  results: ResultType[];
}

const ResultChart = ({ results }: ResultChartProps) => {
  return (
    <ResponsiveContainer width="80%" height={300}>
      <LineChart data={results}>
        <XAxis>
          <Label value="# of texts" offset={-5} position="insideBottom" />
        </XAxis>
        <YAxis>
          <Label value="WPM" position="insideLeft" offset={0}/>
        </YAxis>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        <Line type="monotone" dataKey="wpm" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default ResultChart;
