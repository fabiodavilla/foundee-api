import { PickType } from '@nestjs/mapped-types';
import { CreatePlaceImageDto } from './create-place-image.dto';

export class UpdatePlaceImageDto extends PickType(CreatePlaceImageDto, [
  'imageString',
] as const) {}
