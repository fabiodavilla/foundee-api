import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlacesService } from 'src/places/places.service';
import { toBase64 } from 'src/utils/base64';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePlaceImageDto } from './dto/create-place-image.dto';
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
  ): Promise<PlaceImage> {
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

  async findAllByPlaceId(idPlace: string): Promise<Array<PlaceImage>> {
    const place = await this.placesService.findOneById(idPlace);

    return this.placeImagesRepository.find({ where: { place } });
  }

  findOneById(id: string): Promise<PlaceImage> {
    return this.placeImagesRepository.findOneBy({ id });
  }

  remove(id: string): Promise<DeleteResult> {
    return this.placeImagesRepository.delete(id);
  }
}
