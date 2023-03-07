import { Module } from '@nestjs/common';
import { PointService } from './point.service';
import { PointController } from './point.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from './entities/point.entity';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { PlacesModule } from 'src/places/places.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    // PlacesModule,
    TypeOrmModule.forFeature([Point]),
  ],
  controllers: [PointController],
  providers: [PointService],
  exports: [PointService],
})
export class PointModule {}
