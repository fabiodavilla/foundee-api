import { Module } from '@nestjs/common';
import { CommercialInfoService } from './commercial-info.service';
import { CommercialInfoController } from './commercial-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommercialInfo } from './entities/commercial-info.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommercialInfo, User])],
  controllers: [CommercialInfoController],
  providers: [CommercialInfoService],
})
export class CommercialInfoModule {}
