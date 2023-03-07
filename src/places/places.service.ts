import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Scope,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommercialInfoService } from 'src/commercial-info/commercial-info.service';
import { CommercialInfo } from 'src/commercial-info/entities/commercial-info.entity';
import { Point } from 'src/point/entities/point.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';
import { PlaceImage } from '../place-images/entities/place-image.entity';
import { REQUEST } from '@nestjs/core';
import { UserService } from 'src/user/user.service';
import { ExtendedRequest } from 'src/common/types/extended-request';
import { PlaceImagesService } from 'src/place-images/place-images.service';
import { PointService } from 'src/point/point.service';

@Injectable({ scope: Scope.REQUEST })
export class PlacesService {
  constructor(
    @Inject(REQUEST)
    private readonly request: ExtendedRequest,
    @InjectRepository(Place)
    private readonly placesRepository: Repository<Place>,
    @Inject(CommercialInfoService)
    private readonly commercialInfoService: CommercialInfoService,
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(PlaceImagesService)
    private readonly placeImageService: PlaceImagesService,
    @Inject(PointService)
    private readonly pointService: PointService,
  ) {}

  async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
    try {
      let commercialInfo: CommercialInfo;
      const placeImages = new Array<PlaceImage>();

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

      // Create place
      const newPlace = new Place();
      newPlace.name = createPlaceDto.name;
      newPlace.description = createPlaceDto.description;
      newPlace.status = 1;
      newPlace.placeType = createPlaceDto.placeType;
      newPlace.commercialInfo = createPlaceDto.commercialInfoId
        ? commercialInfo
        : null;

      await this.placesRepository.save(newPlace);

      // Added images
      createPlaceDto.imagesStringList.forEach((imageString) => {
        const newImage = new PlaceImage();
        newImage.imageString = imageString;
        newImage.place = newPlace;
        placeImages.push(newImage);
      });

      newPlace.placeImages = placeImages;
      await this.placeImageService.createMany(placeImages);

      // Added point
      const point = new Point();
      const user = await this.userService.findOneById(
        this.request.userObject.idUser,
      );
      point.idUser = user;
      point.latitude = Number(createPlaceDto.latitude);
      point.longitude = Number(createPlaceDto.longitude);
      point.place = newPlace;

      await this.pointService.create(point);

      areturn newPlace;
      // check pushes
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll(): Promise<Array<Place>> {
    return this.placesRepository.find();
  }

  findOneById(id: string): Promise<Place> {
    return this.placesRepository.findOneBy({ id });
  }

  async findAllByCommercialInfo(idCommInfo: string): Promise<Array<Place>> {
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

  async update(
    id: string,
    updatePlaceDto: UpdatePlaceDto,
  ): Promise<UpdateResult> {
    try {
      return await this.placesRepository.update(id, { ...updatePlaceDto });
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      return await this.placesRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
