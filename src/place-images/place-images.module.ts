import { Module } from '@nestjs/common';
import { PlaceImagesService } from './place-images.service';
import { PlaceImagesController } from './place-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceImage } from './entities/place-image.entity';
import { Place } from 'src/places/entities/place.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlaceImage, Place])],
  controllers: [PlaceImagesController],
  providers: [PlaceImagesService],
})
export class PlaceImagesModule {}
