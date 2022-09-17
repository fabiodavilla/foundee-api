import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlacesService } from 'src/places/places.service';
import { toBase64 } from 'src/utils/base64';
import { Repository } from 'typeorm';
import { CreatePlaceImageDto } from './dto/create-place-image.dto';
import { UpdatePlaceImageDto } from './dto/update-place-image.dto';
import { PlaceImage } from './entities/place-image.entity';

@Injectable()
export class PlaceImagesService {
  constructor(
    @InjectRepository(PlaceImage)
    private readonly placeImagesRepository: Repository<PlaceImage>,
    @Inject(PlacesService)
    private readonly placesService: PlacesService,
  ) {}

  async create(
    createPlaceImageDto: CreatePlaceImageDto,
    file: Express.Multer.File,
  ) {
    const place = await this.placesService.findOneById(
      createPlaceImageDto.idPlace,
    );

    if (!place)
      throw new HttpException(
        'Place not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const newPlaceImage = new PlaceImage();
    newPlaceImage.imageString = toBase64(file);
    newPlaceImage.place = place;

    const placeImage = this.placeImagesRepository.create(newPlaceImage);
    return this.placeImagesRepository.save(placeImage);
  }

  findAllByPlaceId(idPlace: string) {
    const place = this.placesService.findOneById(idPlace);

    return this.placeImagesRepository.find({
      where: { place },
    });
  }

  findOneById(id: string) {
    return this.placeImagesRepository.findOne(id);
  }

  async update(
    updatePlaceImageDto: UpdatePlaceImageDto,
    file: Express.Multer.File,
  ) {
    const placeImage = await this.findOneById(updatePlaceImageDto.id);
    const place = await this.placesService.findOneById(
      updatePlaceImageDto.idPlace,
    );

    if (!placeImage || !place)
      throw new HttpException(
        'Place or PlaceImage not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    placeImage.place = place;
    placeImage.imageString = toBase64(file);

    return this.placeImagesRepository.update(updatePlaceImageDto.id, {
      ...placeImage,
    });
  }

  remove(id: string) {
    return this.placeImagesRepository.delete(id);
  }
}
