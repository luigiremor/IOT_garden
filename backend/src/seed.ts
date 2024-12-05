import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SensorService } from './sensor/sensor.service';
import { CreateSensorDto } from './sensor/dto/create-sensor.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const sensorService = app.get(SensorService);

  const mockData: CreateSensorDto[] = [];

  for (let i = 0; i < 100; i++) {
    mockData.push({
      temperature: Number((20 + Math.random() * 10).toFixed(2)),
      humidity: Number((50 + Math.random() * 20).toFixed(2)),
      lightIntensity: Math.floor(1000 + Math.random() * 9000),
      soilMoisture: Math.floor(10 + Math.random() * 90),
    });
  }

  for (const data of mockData) {
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
