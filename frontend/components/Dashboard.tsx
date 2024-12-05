'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { fetchSensorData, socket } from '@/services/apiService'
import SensorCard from '@/components/SensorCard'

interface SensorData {
  id: number
  timestamp: string
  temperature: number
  humidity: number
  lightIntensity: number
  soilMoisture: number
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [sensorData, setSensorData] = useState<SensorData[]>([])
  const [latestData, setLatestData] = useState<SensorData | null>(null)

  useEffect(() => {
    // Fetch initial sensor data
    const getData = async () => {
      try {
        const data = await fetchSensorData()
        setSensorData(data)
        if (data.length > 0) {
          setLatestData(data[0])
        }
      } catch (error) {
        console.error('Error fetching sensor data:', error)
      }
    }
    getData()

    // Handle real-time updates via WebSocket
    socket.on('newSensorData', (data: SensorData) => {
      setLatestData(data)
      setSensorData((prevData) => [data, ...prevData])
    })

    // Clean up the socket connection when component unmounts
    return () => {
      socket.off('newSensorData')
    }
  }, [])

  // Prepare data for the chart
  const chartData = sensorData
    .slice(0, 20) // Use the latest 20 data points
    .reverse() // Reverse to show from oldest to newest
    .map((data) => ({
      timestamp: new Date(data.timestamp).toLocaleTimeString(),
      temperature: data.temperature,
      humidity: data.humidity,
      lightIntensity: data.lightIntensity,
      soilMoisture: data.soilMoisture,
    }))

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Painel de Controle do Jardim Urbano</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="details">Detalhes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SensorCard title="Sensores Ambientais" data={latestData} />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Dados dos Sensores ao Longo do Tempo</CardTitle>
              <CardDescription>Visualização dos dados coletados pelos sensores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="temperature"
                      stroke="#8884d8"
                      name="Temperatura (°C)"
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="humidity"
                      stroke="#82ca9d"
                      name="Umidade (%)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="lightIntensity"
                      stroke="#ffc658"
                      name="Intensidade de Luz"
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="soilMoisture"
                      stroke="#ff7300"
                      name="Umidade do Solo (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes dos Sensores</CardTitle>
              <CardDescription>Informações detalhadas dos dados coletados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SensorCard title="Sensores Ambientais" data={latestData} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

