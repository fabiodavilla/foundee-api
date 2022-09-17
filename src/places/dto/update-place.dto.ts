import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreatePlaceDto } from './create-place.dto';

export class UpdatePlaceDto extends PartialType(
  OmitType(CreatePlaceDto, ['commercialInfoId'] as const),
) {}
