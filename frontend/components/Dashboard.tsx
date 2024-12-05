"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchSensorData, socket, SensorData } from "@/services/apiService";
import SensorCard from "@/components/SensorCard";
import SensorDetailCard from "@/components/SensorDetailCard";
import SensorChart from "@/components/SensorChart";

const categoryLabels = {
  trees: "Árvores",
  vegetables: "Vegetais",
  ornamentals: "Ornamentais",
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [latestDataByCategory, setLatestDataByCategory] = useState<{
    [key in SensorData["category"]]?: SensorData;
  }>({});

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchSensorData();
        setSensorData(data);

        // Get the latest data per category
        const latestData: { [key in SensorData["category"]]?: SensorData } = {};
        for (const category of [
          "trees",
          "vegetables",
          "ornamentals",
        ] as const) {
          latestData[category] = data.find((d) => d.category === category);
        }
        setLatestDataByCategory(latestData);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };
    getData();

    // Handle real-time updates via WebSocket
    socket.on("newSensorData", (data: SensorData) => {
      setSensorData((prevData) => [data, ...prevData]);

      setLatestDataByCategory((prevLatest) => ({
        ...prevLatest,
        [data.category]: data,
      }));
    });

    return () => {
      socket.off("newSensorData");
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Painel de Controle do Jardim Urbano
      </h1>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="details">Detalhes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(["trees", "vegetables", "ornamentals"] as const).map(
              (category) => (
                <SensorCard
                  key={category}
                  title={`${categoryLabels[category]}`}
                  data={latestDataByCategory[category] || undefined}
                />
              )
            )}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Comparações dos Dados dos Sensores</CardTitle>
              <CardDescription>
                Compare os dados dos sensores entre as categorias ao longo do
                tempo
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <Card>
                <SensorChart data={sensorData} metric="temperature" />
              </Card>
              <Card>
                <SensorChart data={sensorData} metric="humidity" />
              </Card>
              <Card>
                <SensorChart data={sensorData} metric="lightIntensity" />
              </Card>
              <Card>
                <SensorChart data={sensorData} metric="soilMoisture" />
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes dos Sensores</CardTitle>
              <CardDescription>
                Informações detalhadas dos dados coletados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(["trees", "vegetables", "ornamentals"] as const).map(
                  (category) => (
                    <SensorDetailCard
                      key={category}
                      title={`${categoryLabels[category]}`}
                      data={latestDataByCategory[category] || undefined}
                    />
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
