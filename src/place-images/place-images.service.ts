import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from 'src/places/entities/place.entity';
import { Repository } from 'typeorm';
import { CreatePlaceImageDto } from './dto/create-place-image.dto';
import { UpdatePlaceImageDto } from './dto/update-place-image.dto';
import { PlaceImage } from './entities/place-image.entity';

@Injectable()
export class PlaceImagesService {
  constructor(
    @InjectRepository(PlaceImage)
    private readonly placeImagesRepository: Repository<PlaceImage>,
    @InjectRepository(Place)
    private readonly placecRepository: Repository<Place>,
  ) {}

  async create(createPlaceImageDto: CreatePlaceImageDto) {
    const place = await this.placecRepository.findOne(
      createPlaceImageDto.idPlace,
    );

    if (!place)
      throw new HttpException(
        'Place not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const newPlaceImage = new PlaceImage();
    newPlaceImage.imageString = createPlaceImageDto.imageString;
    newPlaceImage.place = place;

    const placeImage = this.placeImagesRepository.create(newPlaceImage);
    return this.placeImagesRepository.save(placeImage);
  }

  findAllByPlaceId(idPlace: string) {
    const place = this.placecRepository.findOne(idPlace);

    return this.placeImagesRepository.find({
      where: { place },
    });
  }

  findOneById(id: string) {
    return this.placeImagesRepository.findOne(id);
  }

  async update(id: string, updatePlaceImageDto: UpdatePlaceImageDto) {
    const placeImage = await this.findOneById(id);

    if (!placeImage)
      throw new HttpException(
        'PlaceImage not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return this.placeImagesRepository.update(id, { ...updatePlaceImageDto });
  }

  remove(id: string) {
    return this.placeImagesRepository.delete(id);
  }
}
