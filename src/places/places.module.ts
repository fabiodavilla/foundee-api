import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { CommercialInfoModule } from 'src/commercial-info/commercial-info.module';
import { UserModule } from 'src/user/user.module';
import { PlaceImagesModule } from 'src/place-images/place-images.module';
import { PointModule } from 'src/point/point.module';

@Module({
  imports: [
    CommercialInfoModule,
    UserModule,
    PlaceImagesModule,
    PointModule,
    TypeOrmModule.forFeature([Place]),
  ],
  controllers: [PlacesController],
  providers: [PlacesService],
  exports: [PlacesService],
})
export class PlacesModule {}
