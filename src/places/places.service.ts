import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommercialInfoService } from 'src/commercial-info/commercial-info.service';
import { CommercialInfo } from 'src/commercial-info/entities/commercial-info.entity';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private readonly placesRepository: Repository<Place>,
    @Inject(CommercialInfoService)
    private readonly commercialInfoService: CommercialInfoService,
  ) {}

  async create(createPlaceDto: CreatePlaceDto) {
    try {
      let commercialInfo: CommercialInfo;

      if (createPlaceDto.commercialInfoId) {
        commercialInfo = await this.commercialInfoService.findOne(
          createPlaceDto.commercialInfoId,
        );

        if (!commercialInfo)
          throw new HttpException(
            'Commercial Info not found!',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }

      const newPlace = new Place();
      newPlace.name = createPlaceDto.name;
      newPlace.description = createPlaceDto.description;
      newPlace.status = createPlaceDto.status;
      newPlace.placeType = createPlaceDto.placeType;
      newPlace.commercialInfo = commercialInfo;

      const place = this.placesRepository.create(newPlace);
      return this.placesRepository.save(place);
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    return this.placesRepository.find();
  }

  findOneById(id: string) {
    return this.placesRepository.findOne(id);
  }

  async findAllByCommercialInfo(idCommInfo: string) {
    const commercialInfo = await this.commercialInfoService.findOne(idCommInfo);

    if (!commercialInfo)
      throw new HttpException(
        'Commercial Info not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return this.placesRepository.find({
      where: {
        commercialInfo: commercialInfo,
      },
    });
  }

  update(id: string, updatePlaceDto: UpdatePlaceDto) {
    try {
      return this.placesRepository.update(id, { ...updatePlaceDto });
    } catch (error) {
      throw new Error(error);
    }
  }

  remove(id: string) {
    try {
      return this.placesRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
