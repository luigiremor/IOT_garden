import { PartialType } from '@nestjs/mapped-types';
import { CreateRelayDto } from './create-relay.dto';

export class UpdateRelayDto extends PartialType(CreateRelayDto) {
  treeZone: boolean;
  vegetableZone: boolean;
  potZone: boolean;
}
