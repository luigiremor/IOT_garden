import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SensorService } from './sensor/sensor.service';
import { CreateSensorDto } from './sensor/dto/create-sensor.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const sensorService = app.get(SensorService);

  const categories: ('trees' | 'vegetables' | 'ornamentals')[] = [
    'trees',
    'vegetables',
    'ornamentals',
  ];

  // Generate mock data
  for (let i = 0; i < 100; i++) {
    const data: CreateSensorDto = {
      temperature: parseFloat((Math.random() * 10 + 20).toFixed(2)),
      humidity: parseFloat((Math.random() * 20 + 40).toFixed(2)),
      lightIntensity: Math.floor(Math.random() * 10000),
      soilMoisture: Math.floor(Math.random() * 100),
      category: categories[Math.floor(Math.random() * categories.length)],
    };
    await sensorService.handleSensorData(data);
  }

  await app.close();
}

bootstrap()
  .then(() => {
    console.log('Seeding completed.');
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
  });
