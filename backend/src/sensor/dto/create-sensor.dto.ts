export class CreateSensorDto {
  temperature: number;
  humidity: number;
  lightIntensity: number;
  soilMoisture: number;
  category: 'trees' | 'vegetables' | 'ornamentals';
}
