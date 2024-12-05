// src/relay/relay.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { MqttService } from '@/mqtt/mqtt.service';
import { UpdateRelayDto } from './dto/update-relay.dto';

@Injectable()
export class RelayService {
  private readonly logger = new Logger(RelayService.name);

  // Current state of the relays
  private relayStatus: UpdateRelayDto = {
    treeZone: false,
    vegetableZone: false,
    potZone: false,
  };

  constructor(private readonly mqttService: MqttService) {}

  /**
   * Updates the states of the relays and publishes the corresponding MQTT message.
   * @param updateRelayDto - Object containing the desired states for each relay.
   */
  async updateRelays(updateRelayDto: UpdateRelayDto): Promise<void> {
    // Update internal state
    this.relayStatus = updateRelayDto;

    // Create the payload string, e.g., '101' to turn on treeZone and potZone
    const payload = `${updateRelayDto.treeZone ? '1' : '0'}${updateRelayDto.vegetableZone ? '1' : '0'}${updateRelayDto.potZone ? '1' : '0'}`;

    this.logger.log(
      `Publishing payload '${payload}' to topic 'irrigation/control'`,
    );

    // Publish the message to the MQTT topic
    await this.mqttService.publish('irrigation/control', payload);
  }

  /**
   * Returns the current state of the relays.
   */
  getRelayStatus(): UpdateRelayDto {
    return this.relayStatus;
  }
}
