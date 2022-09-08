import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from 'src/places/entities/place.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePlaceCommentDto } from './dto/create-place-comment.dto';
import { UpdatePlaceCommentDto } from './dto/update-place-comment.dto';
import { PlaceComment } from './entities/place-comment.entity';

@Injectable()
export class PlaceCommentsService {
  constructor(
    @InjectRepository(PlaceComment)
    private readonly placeCommentRepository: Repository<PlaceComment>,
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createPlaceCommentDto: CreatePlaceCommentDto) {
    try {
      if (!createPlaceCommentDto.idPlace || !createPlaceCommentDto.idUser)
        throw new HttpException(
          'Incorrect Data',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );

      const place = await this.placeRepository.findOne(
        createPlaceCommentDto.idPlace,
      );
      const user = await this.userRepository.findOne(
        createPlaceCommentDto.idUser,
      );

      if (!place || !user)
        throw new HttpException(
          'Incorrect Data',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );

      const newPlaceComment = new PlaceComment();
      newPlaceComment.comment = createPlaceCommentDto.comment;
      newPlaceComment.user = user;
      newPlaceComment.place = place;

      const placeComment = this.placeCommentRepository.create(newPlaceComment);

      return this.placeCommentRepository.save(placeComment);
    } catch (error) {
      throw new Error(error);
    }
  }

  findOneById(id: string) {
    return this.placeCommentRepository.findOne(id);
  }

  async findAllByPlaceId(idPlace: string) {
    const place = await this.placeRepository.findOne(idPlace);

    if (!place)
      throw new HttpException(
        'Place not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return this.placeCommentRepository.find({
      where: { place },
    });
  }

  async findAllByUser(idUser: string) {
    const user = await this.userRepository.findOne(idUser);

    if (!user)
      throw new HttpException(
        'User not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return this.placeCommentRepository.find({
      where: {
        user,
      },
    });
  }

  async update(
    id: string,
    idUser: string,
    updatePlaceCommentDto: UpdatePlaceCommentDto,
  ) {
    const comment = await this.placeCommentRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (comment.user.id !== idUser)
      throw new HttpException(
        'Cannot change another user comment!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return this.placeCommentRepository.update(id, { ...updatePlaceCommentDto });
  }

  async remove(id: string, idUser: string) {
    const comment = await this.placeCommentRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (comment.user.id !== idUser)
      throw new HttpException(
        'Cannot change another user comment!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return this.placeCommentRepository.delete(id);
  }
}
