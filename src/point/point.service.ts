import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from 'src/places/entities/place.entity';
import { User } from 'src/user/entities/user.entity';
import { Between, Repository } from 'typeorm';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { Point } from './entities/point.entity';

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(Point, 'mongo')
    private readonly pointRepository: Repository<Point>,
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createPointDto: CreatePointDto) {
    const place = await this.placeRepository.find({
      where: { id: createPointDto.idPlace },
    });

    const user = await this.userRepository.find({
      where: { id: createPointDto.idUser },
    });

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
  ) {
    const res = await this.pointRepository.find({
      where: {
        latitude: { $gt: latDown, $lt: latUp },
        longitude: { $gt: lonDown, $lt: lonUp },
      },
    });

    return res;
  }

  async findAllByUser(idUser: string) {
    const user = await this.userRepository.findOne(idUser);

    if (!user)
      throw new HttpException(
        'User not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return this.pointRepository.find({
      where: { idUser: user.id },
    });
  }

  async update(id: string, idUser: string, updatePointDto: UpdatePointDto) {
    const user = await this.userRepository.findOne(idUser);

    if (!user)
      throw new HttpException(
        'User not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return this.pointRepository.update(id, { ...updatePointDto });
  }

  async remove(id: string, idUser: string) {
    const user = await this.userRepository.findOne(idUser);

    if (!user)
      throw new HttpException(
        'User not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return this.pointRepository.delete(id);
  }
}
