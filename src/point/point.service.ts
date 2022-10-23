import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlacesService } from 'src/places/places.service';
import { UserService } from 'src/user/user.service';
import {
  DeleteResult,
  LessThan,
  MoreThan,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { Point } from './entities/point.entity';

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(Point, 'mongo')
    private readonly pointRepository: Repository<Point>,
    @Inject(PlacesService)
    private readonly placeService: PlacesService,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async create(createPointDto: CreatePointDto): Promise<Point> {
    const place = await this.placeService.findOneById(createPointDto.idPlace);
    const user = await this.userService.findOneById(createPointDto.idUser);

    if (!user || !place)
      throw new HttpException(
        'User or place not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const newPoint = new Point();
    newPoint.idUser = createPointDto.idUser;
    newPoint.idPlace = createPointDto.idPlace;
    newPoint.latitude = createPointDto.latitude;
    newPoint.longitude = createPointDto.longitude;
    newPoint.placeType = createPointDto.placeType;

    const point = this.pointRepository.create(newPoint);
    return this.pointRepository.save(point);
  }

  async findAllByLocation(
    latDown: number,
    lonDown: number,
    latUp: number,
    lonUp: number,
  ): Promise<Array<Point>> {
    const res = await this.pointRepository.find({
      where: {
        latitude: MoreThan(latDown) && LessThan(latUp),
        // latitude: { $gt: latDown, $lt: latUp },
        longitude: MoreThan(lonDown) && LessThan(lonUp),
        // longitude: { $gt: lonDown, $lt: lonUp },
      },
    });

    return res;
  }

  async findAllByUser(idUser: string): Promise<Array<Point>> {
    const user = await this.userService.findOneById(idUser);

    if (!user)
      throw new HttpException(
        'User not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return this.pointRepository.find({
      where: { idUser: user.id },
    });
  }

  async update(
    id: string,
    idUser: string,
    updatePointDto: UpdatePointDto,
  ): Promise<UpdateResult> {
    const user = await this.userService.findOneById(idUser);

    if (!user)
      throw new HttpException(
        'User not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return this.pointRepository.update(id, { ...updatePointDto });
  }

  async remove(id: string, idUser: string): Promise<DeleteResult> {
    const user = await this.userService.findOneById(idUser);

    if (!user)
      throw new HttpException(
        'User not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return this.pointRepository.delete(id);
  }
}
