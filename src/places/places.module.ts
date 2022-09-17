import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { CommercialInfoModule } from 'src/commercial-info/commercial-info.module';

@Module({
  imports: [CommercialInfoModule, TypeOrmModule.forFeature([Place])],
  controllers: [PlacesController],
  providers: [PlacesService],
  exports: [PlacesService],
})
export class PlacesModule {}
