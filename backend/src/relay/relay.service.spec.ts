import { Test, TestingModule } from '@nestjs/testing';
import { RelayService } from './relay.service';
import { MqttService } from '@/mqtt/mqtt.service';

describe('RelayService', () => {
  let service: RelayService;
  let mqttService: MqttService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelayService,
        {
          provide: MqttService,
          useValue: {
            publish: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RelayService>(RelayService);
    mqttService = module.get<MqttService>(MqttService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update relays and publish correct MQTT message', async () => {
    const updateRelayDto = {
      treeZone: true,
      vegetableZone: false,
      potZone: true,
    };

    await service.updateRelays(updateRelayDto);

    expect(service.getRelayStatus()).toEqual(updateRelayDto);
    expect(mqttService.publish).toHaveBeenCalledWith(
      'irrigation/control',
      '101',
    );
  });
});
