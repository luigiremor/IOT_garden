import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { OnEvent } from '@nestjs/event-emitter';
import { Sensor } from './entities/sensor.entity';
import { SensorGateway } from './sensor.gateway';

@Injectable()
export class SensorService {
  private readonly logger = new Logger(SensorService.name);

  constructor(
    @InjectRepository(Sensor)
    private readonly sensorRepository: Repository<Sensor>,
    private readonly sensorGateway: SensorGateway,
  ) {}

  @OnEvent('sensor.data')
  async handleSensorDataEvent(payload: { topic: string; message: string }) {
    const { message } = payload;

    this.logger.log(`Received sensor data: ${message}`);

    try {
      const parsed = JSON.parse(message);
      const sensorData: CreateSensorDto = {
        temperature: parsed.temperature,
        humidity: parsed.humidity,
        lightIntensity: parsed.light,
        soilMoisture: parsed.soilMoisture,
      };
      await this.handleSensorData(sensorData);
    } catch (error) {
      this.logger.error('Error parsing sensor data:', error);
    }
  }

  async handleSensorData(data: CreateSensorDto): Promise<void> {
    const sensorData = this.sensorRepository.create(data);
    await this.sensorRepository.save(sensorData);
    this.logger.log(`Sensor data saved: ${JSON.stringify(sensorData)}`);

    // Broadcast the new sensor data to connected clients via WebSocket
    try {
      this.sensorGateway.broadcastSensorData(sensorData);
    } catch (error) {
      this.logger.error('Error broadcasting sensor data:', error);
    }
  }

  async getAllSensorData(): Promise<Sensor[]> {
    return this.sensorRepository.find({ order: { timestamp: 'DESC' } });
  }

  async getLastSensorData(limit: number): Promise<Sensor[]> {
    const sanitizedLimit = Math.max(1, limit);
    return await this.sensorRepository.find({
      order: { timestamp: 'DESC' },
      take: sanitizedLimit,
    });
  }
}
