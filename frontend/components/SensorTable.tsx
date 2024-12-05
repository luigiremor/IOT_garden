'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'

const data = [
  { id: 1, timestamp: '2024-03-01 10:00:00', temperature: 22, humidity: 60, light: 3000, soil: 28 },
  { id: 2, timestamp: '2024-03-01 11:00:00', temperature: 23, humidity: 58, light: 3500, soil: 27 },
  { id: 3, timestamp: '2024-03-01 12:00:00', temperature: 25, humidity: 55, light: 4000, soil: 26 },
  { id: 4, timestamp: '2024-03-01 13:00:00', temperature: 26, humidity: 54, light: 4200, soil: 25 },
  { id: 5, timestamp: '2024-03-01 14:00:00', temperature: 26, humidity: 53, light: 4100, soil: 24 },
]

export function SensorTable() {
  const [filter, setFilter] = useState('')

  const filteredData = data.filter(
    (item) =>
      item.timestamp.includes(filter) ||
      item.temperature.toString().includes(filter) ||
      item.humidity.toString().includes(filter) ||
      item.light.toString().includes(filter) ||
      item.soil.toString().includes(filter)
  )

  return (
    <div className="space-y-4">
      <Input
        placeholder="Filter data..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Temperature (°C)</TableHead>
            <TableHead>Humidity (%)</TableHead>
            <TableHead>Light (lux)</TableHead>
            <TableHead>Soil Moisture (%)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.timestamp}</TableCell>
              <TableCell>{row.temperature}</TableCell>
              <TableCell>{row.humidity}</TableCell>
              <TableCell>{row.light}</TableCell>
              <TableCell>{row.soil}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

