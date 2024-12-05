import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit {
  private readonly logger = new Logger(MqttService.name);
  private client: mqtt.MqttClient;

  constructor(
    private readonly configService: ConfigService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  onModuleInit() {
    const mqttUrl = this.configService.get<string>(
      'MQTT_BROKER_URL',
      'mqtt://localhost:1883',
    );

    this.client = mqtt.connect(mqttUrl);

    this.client.on('connect', () => {
      this.logger.log('Connected to MQTT broker');

      // Subscribe to the 'horta/sensors' topic
      this.client.subscribe('horta/sensors', (error) => {
        if (error) {
          this.logger.error('Failed to subscribe to horta/sensors:', error);
        } else {
          this.logger.log('Subscribed to horta/sensors');
        }
      });
    });

    this.client.on('error', (error) => {
      this.logger.error('MQTT connection error:', error);
    });

    // Handle incoming messages
    this.client.on('message', (topic: string, payload: Buffer) => {
      const message = payload.toString();
      this.logger.log(`Received message from ${topic}: ${message}`);

      // Emit an event with the topic and message
      this.eventEmitter.emit('sensor.data', { topic, message });
    });
  }

  async publish(topic: string, message: string): Promise<void> {
    this.client.publish(topic, message, (error) => {
      if (error) {
        this.logger.error(`Failed to publish message to ${topic}:`, error);
      } else {
        this.logger.log(`Message published to ${topic}: ${message}`);
      }
    });
  }

  // Add subscribe method if you need to subscribe to additional topics
  async subscribe(topic: string): Promise<void> {
    this.client.subscribe(topic, (error) => {
      if (error) {
        this.logger.error(`Failed to subscribe to ${topic}:`, error);
      } else {
        this.logger.log(`Subscribed to ${topic}`);
      }
    });
  }

  // Similarly, you can add an unsubscribe method
  async unsubscribe(topic: string): Promise<void> {
    this.client.unsubscribe(topic, (error) => {
      if (error) {
        this.logger.error(`Failed to unsubscribe from ${topic}:`, error);
      } else {
        this.logger.log(`Unsubscribed from ${topic}`);
      }
    });
  }
}
