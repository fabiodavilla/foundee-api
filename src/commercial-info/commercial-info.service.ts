import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommercialInfoDto } from './dto/create-commercial-info.dto';
import { UpdateCommercialInfoDto } from './dto/update-commercial-info.dto';
import { CommercialInfo } from './entities/commercial-info.entity';

@Injectable()
export class CommercialInfoService {
  constructor(
    @InjectRepository(CommercialInfo)
    private commercialInfoRepository: Repository<CommercialInfo>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createCommercialInfoDto: CreateCommercialInfoDto) {
    const user = await this.userRepository.findOne(
      createCommercialInfoDto.idUser,
    );

    if (!user)
      throw new HttpException(
        'User not found!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const newCommercialInfo = new CommercialInfo();

    newCommercialInfo.user = user;
    newCommercialInfo.registry = createCommercialInfoDto.registry;

    const commercialInfo =
      this.commercialInfoRepository.create(newCommercialInfo);

    return this.commercialInfoRepository.save(commercialInfo);
  }

  findAll() {
    return this.commercialInfoRepository.find();
  }

  findOne(id: string) {
    return this.commercialInfoRepository.findOne(id);
  }

  findAllByUser(idUser: string) {
    const user = this.userRepository.findOne(idUser);

    return this.commercialInfoRepository.find({
      where: {
        user: user,
      },
    });
  }

  update(id: string, updateCommercialInfoDto: UpdateCommercialInfoDto) {
    try {
      return this.commercialInfoRepository.update(id, {
        ...updateCommercialInfoDto,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  remove(id: string) {
    try {
      return this.commercialInfoRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
