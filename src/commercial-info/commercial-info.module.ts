import { Module } from '@nestjs/common';
import { CommercialInfoService } from './commercial-info.service';
import { CommercialInfoController } from './commercial-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommercialInfo } from './entities/commercial-info.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([CommercialInfo])],
  controllers: [CommercialInfoController],
  providers: [CommercialInfoService],
  exports: [CommercialInfoService],
})
export class CommercialInfoModule {}
