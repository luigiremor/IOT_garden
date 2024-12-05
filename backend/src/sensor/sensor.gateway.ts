import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Sensor } from './entities/sensor.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/sensors',
})
export class SensorGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger = new Logger('SensorGateway');

  afterInit() {
    this.logger.log('SensorGateway Initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  broadcastSensorData(data: Sensor) {
    this.logger.log('Broadcasting new sensor data');
    this.server.emit('newSensorData', data);
  }
}
