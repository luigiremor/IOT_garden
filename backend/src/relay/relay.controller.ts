// src/relay/relay.controller.ts

import { Controller, Post, Body, Get } from '@nestjs/common';
import { RelayService } from './relay.service';
import { UpdateRelayDto } from './dto/update-relay.dto';

@Controller('relay')
export class RelayController {
  constructor(private readonly relayService: RelayService) {}

  /**
   * Endpoint to update the states of the relays.
   * Example request:
   * POST /relay/update
   * {
   *   "treeZone": true,
   *   "vegetableZone": false,
   *   "potZone": true
   * }
   */
  @Post('update')
  async updateRelays(@Body() updateRelayDto: UpdateRelayDto): Promise<string> {
    await this.relayService.updateRelays(updateRelayDto);
    return 'Relay states updated successfully!';
  }

  /**
   * Endpoint to get the current state of the relays.
   * Example request:
   * GET /relay/status
   */
  @Get('status')
  async getRelayStatus(): Promise<UpdateRelayDto> {
    return this.relayService.getRelayStatus();
  }
}
