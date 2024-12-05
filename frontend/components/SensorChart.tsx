'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { time: '00:00', temperature: 20, humidity: 60, light: 0, soil: 30 },
  { time: '04:00', temperature: 18, humidity: 65, light: 0, soil: 32 },
  { time: '08:00', temperature: 22, humidity: 55, light: 3000, soil: 28 },
  { time: '12:00', temperature: 27, humidity: 50, light: 5000, soil: 25 },
  { time: '16:00', temperature: 25, humidity: 55, light: 4000, soil: 27 },
  { time: '20:00', temperature: 22, humidity: 60, light: 1000, soil: 29 },
]

export function SensorChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line yAxisId="left" type="monotone" dataKey="humidity" stroke="#82ca9d" />
        <Line yAxisId="right" type="monotone" dataKey="light" stroke="#ffc658" />
        <Line yAxisId="left" type="monotone" dataKey="soil" stroke="#ff7300" />
      </LineChart>
    </ResponsiveContainer>
  )
}

