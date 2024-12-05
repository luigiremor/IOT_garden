'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import AlertsConfigForm from './AlertsConfigForm'

// Dados simulados para o gráfico
const chartData = [
  { time: '00:00', trees: 22, vegetables: 24, ornamentals: 23 },
  { time: '04:00', trees: 20, vegetables: 22, ornamentals: 21 },
  { time: '08:00', trees: 24, vegetables: 26, ornamentals: 25 },
  { time: '12:00', trees: 28, vegetables: 30, ornamentals: 29 },
  { time: '16:00', trees: 26, vegetables: 28, ornamentals: 27 },
  { time: '20:00', trees: 24, vegetables: 26, ornamentals: 25 },
]

// Dados simulados para os sensores
const sensorData = {
  trees: { temperature: 24, humidity: 65, soilMoisture: 40, lightIntensity: 5000 },
  vegetables: { temperature: 26, humidity: 70, soilMoisture: 60, lightIntensity: 6000 },
  ornamentals: { temperature: 25, humidity: 68, soilMoisture: 50, lightIntensity: 5500 },
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Painel de Controle do Jardim Urbano</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="alerts">Configuração de Alertas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SensorCard title="Árvores" data={sensorData.trees} />
            <SensorCard title="Leguminosas" data={sensorData.vegetables} />
            <SensorCard title="Ornamentais" data={sensorData.ornamentals} />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Temperatura ao Longo do Dia</CardTitle>
              <CardDescription>Comparação entre árvores, leguminosas e ornamentais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="trees" stroke="#8884d8" name="Árvores" />
                    <Line type="monotone" dataKey="vegetables" stroke="#82ca9d" name="Leguminosas" />
                    <Line type="monotone" dataKey="ornamentals" stroke="#ffc658" name="Ornamentais" />
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
              <CardDescription>Informações detalhadas para cada área do jardim</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SensorDetailCard title="Árvores" data={sensorData.trees} />
                <SensorDetailCard title="Leguminosas" data={sensorData.vegetables} />
                <SensorDetailCard title="Ornamentais" data={sensorData.ornamentals} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Configuração de Alertas</CardTitle>
              <CardDescription>Defina os limites para receber notificações</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertsConfigForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function SensorCard({ title, data }: { title: string, data: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-sm">Temperatura:</div>
          <div className="text-sm font-medium">{data.temperature}°C</div>
          <div className="text-sm">Umidade:</div>
          <div className="text-sm font-medium">{data.humidity}%</div>
          <div className="text-sm">Umidade do Solo:</div>
          <div className="text-sm font-medium">{data.soilMoisture}%</div>
          <div className="text-sm">Intensidade de Luz:</div>
          <div className="text-sm font-medium">{data.lightIntensity} lux</div>
        </div>
      </CardContent>
    </Card>
  )
}

function SensorDetailCard({ title, data }: { title: string, data: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <div className="text-sm font-medium">Temperatura</div>
            <div className="text-2xl">{data.temperature}°C</div>
          </div>
          <div>
            <div className="text-sm font-medium">Umidade</div>
            <div className="text-2xl">{data.humidity}%</div>
          </div>
          <div>
            <div className="text-sm font-medium">Umidade do Solo</div>
            <div className="text-2xl">{data.soilMoisture}%</div>
          </div>
          <div>
            <div className="text-sm font-medium">Intensidade de Luz</div>
            <div className="text-2xl">{data.lightIntensity} lux</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

