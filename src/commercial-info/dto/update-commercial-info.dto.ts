import { PartialType } from '@nestjs/mapped-types';
import { CreateCommercialInfoDto } from './create-commercial-info.dto';

export class UpdateCommercialInfoDto extends PartialType(CreateCommercialInfoDto) {}
