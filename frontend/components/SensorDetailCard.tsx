import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SensorData {
  temperature: number;
  humidity: number;
  lightIntensity: number;
  soilMoisture: number;
}

interface SensorDetailCardProps {
  title: string;
  data: SensorData | null;
}

export default function SensorDetailCard({ title, data }: SensorDetailCardProps) {
  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Carregando dados...</div>
        </CardContent>
      </Card>
    );
  }

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
  );
} 