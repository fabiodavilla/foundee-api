import { Module } from '@nestjs/common';
import { PlaceImagesService } from './place-images.service';
import { PlaceImagesController } from './place-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceImage } from './entities/place-image.entity';
import { PlacesModule } from 'src/places/places.module';

@Module({
  imports: [
    //PlacesModule,
    TypeOrmModule.forFeature([PlaceImage]),
  ],
  controllers: [PlaceImagesController],
  providers: [PlaceImagesService],
  exports: [PlaceImagesService],
})
export class PlaceImagesModule {}
