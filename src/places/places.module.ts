import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { CommercialInfo } from 'src/commercial-info/entities/commercial-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Place, CommercialInfo])],
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class PlacesModule {}
