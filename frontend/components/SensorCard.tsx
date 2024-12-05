import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SensorData } from '@/services/apiService';

interface SensorCardProps {
  title: string;
  data: SensorData | null;
}

export default function SensorCard({ title, data }: SensorCardProps) {
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
  );
} 