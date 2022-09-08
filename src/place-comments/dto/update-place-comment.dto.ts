import { PickType } from '@nestjs/mapped-types';
import { CreatePlaceCommentDto } from './create-place-comment.dto';

export class UpdatePlaceCommentDto extends PickType(CreatePlaceCommentDto, [
  'comment',
]) {}
