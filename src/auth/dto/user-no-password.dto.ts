import { OmitType, PartialType } from '@nestjs/mapped-types';
import { User } from 'src/user/entities/user.entity';

export class UserNoPassword extends PartialType(
  OmitType(User, ['password'] as const),
) {}
