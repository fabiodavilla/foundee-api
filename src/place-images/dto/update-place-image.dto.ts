import { IntersectionType } from '@nestjs/mapped-types';
import { CreatePlaceImageDto } from './create-place-image.dto';

class UpdateImage {
  id: string;
}

export class UpdatePlaceImageDto extends IntersectionType(
  UpdateImage,
  CreatePlaceImageDto,
) {}
