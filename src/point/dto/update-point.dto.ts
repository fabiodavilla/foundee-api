import { PickType } from '@nestjs/mapped-types';
import { CreatePointDto } from './create-point.dto';

export class UpdatePointDto extends PickType(CreatePointDto, [
  'latitude',
  'longitude',
  'placeType',
]) {}
