import { Module } from '@nestjs/common';
import { PointService } from './point.service';
import { PointController } from './point.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Point } from './entities/point.entity';
import { ConfigModule } from '@nestjs/config';
import { Place } from 'src/places/entities/place.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Point], 'mongo'),
    TypeOrmModule.forFeature([Place, User]),
  ],
  controllers: [PointController],
  providers: [PointService],
})
export class PointModule {}
