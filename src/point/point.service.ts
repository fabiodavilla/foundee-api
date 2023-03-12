import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { DeleteResult, Repository } from 'typeorm';
import { BoundsDto } from './dto/bounds.dto';
import { Point } from './entities/point.entity';

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>,
    // @Inject(PlacesService)
    // private readonly placeService: PlacesService,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async create(point: Point): Promise<Point> {
    // const place = await this.placeService.findOneById(createPointDto.idPlace);
    // const user = await this.userService.findOneById(createPointDto.idUser);

    // if (!user || !place)
    //   throw new HttpException(
    //     'User or place not found!',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );

    // const newPoint = new Point();
    // newPoint.idUser = user;
    // // newPoint.idPlace = place;
    // newPoint.latitude = createPointDto.latitude;
    // newPoint.longitude = createPointDto.longitude;
    // // newPoint.placeType = createPointDto.placeType;

    return this.pointRepository.save(point);
  }

  async findAllByLocation(bounds: BoundsDto): Promise<Array<Point>> {
    const results = await this.pointRepository
      .createQueryBuilder('point')
      .leftJoinAndSelect('point.place', 'place')
      .where(
        `"point"."longitude" BETWEEN least(${bounds.west}, ${bounds.east}) AND greatest(${bounds.west}, ${bounds.east})
        AND "point"."latitude" BETWEEN least(${bounds.north}, ${bounds.south}) AND greatest(${bounds.north}, ${bounds.south})`,
      )
      .getMany();

    return results;
  }

  async findAllByUser(idUser: string): Promise<Array<Point>> {
    const user = await this.userService.findOneById(idUser);

    if (!user)
      throw new HttpException(
        'User not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return this.pointRepository.find({
      where: { user },
    });
  }

  // async update(
  //   id: string,
  //   idUser: string,
  //   updatePointDto: UpdatePointDto,
  // ): Promise<UpdateResult> {
  //   const user = await this.userService.findOneById(idUser);

  //   if (!user)
  //     throw new HttpException(
  //       'User not found!',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );

  //   return this.pointRepository.update(id, { ...updatePointDto });
  // }

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
