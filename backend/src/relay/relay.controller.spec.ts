import { Test, TestingModule } from '@nestjs/testing';
import { RelayController } from './relay.controller';
import { RelayService } from './relay.service';

describe('RelayController', () => {
  let controller: RelayController;
  let service: RelayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelayController],
      providers: [
        {
          provide: RelayService,
          useValue: {
            updateRelays: jest.fn(),
            getRelayStatus: jest.fn().mockReturnValue({
              treeZone: true,
              vegetableZone: false,
              potZone: true,
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<RelayController>(RelayController);
    service = module.get<RelayService>(RelayService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should update relay states', async () => {
    const updateRelayDto = {
      treeZone: true,
      vegetableZone: false,
      potZone: true,
    };

    const result = await controller.updateRelays(updateRelayDto);

    expect(service.updateRelays).toHaveBeenCalledWith(updateRelayDto);
    expect(result).toBe('Relay states updated successfully!');
  });

  it('should get relay status', async () => {
    const status = await controller.getRelayStatus();

    expect(service.getRelayStatus).toHaveBeenCalled();
    expect(status).toEqual({
      treeZone: true,
      vegetableZone: false,
      potZone: true,
    });
  });
});
