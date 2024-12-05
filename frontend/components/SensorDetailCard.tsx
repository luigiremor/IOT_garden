"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SensorData } from "@/services/apiService";

interface SensorDetailCardProps {
  title: string;
  data: SensorData | undefined;
}

export default function SensorDetailCard({ title, data }: SensorDetailCardProps) {
  return (
    <Card className="bg-white shadow-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {data ? (
          <div className="space-y-2">
            <div>
              <span className="font-medium">Timestamp:</span>{" "}
              {new Date(data.timestamp).toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Temperature:</span> {data.temperature}°C
            </div>
            <div>
              <span className="font-medium">Humidity:</span> {data.humidity}%
            </div>
            <div>
              <span className="font-medium">Light Intensity:</span> {data.lightIntensity} lux
            </div>
            <div>
              <span className="font-medium">Soil Moisture:</span> {data.soilMoisture}%
            </div>
          </div>
        ) : (
          <div>No data available.</div>
        )}
      </CardContent>
    </Card>
  );
} 