import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateCommercialInfoDto } from './dto/create-commercial-info.dto';
import { UpdateCommercialInfoDto } from './dto/update-commercial-info.dto';
import { CommercialInfo } from './entities/commercial-info.entity';

@Injectable()
export class CommercialInfoService {
  constructor(
    @InjectRepository(CommercialInfo)
    private readonly commercialInfoRepository: Repository<CommercialInfo>,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async create(
    createCommercialInfoDto: CreateCommercialInfoDto,
  ): Promise<CommercialInfo> {
    const user = await this.userService.findOneById(
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

  findAll(): Promise<Array<CommercialInfo>> {
    return this.commercialInfoRepository.find();
  }

  findOne(id: string): Promise<CommercialInfo> {
    return this.commercialInfoRepository.findOneBy({ id });
  }

  async findAllByUser(idUser: string): Promise<Array<CommercialInfo>> {
    const user = await this.userService.findOneById(idUser);

    return this.commercialInfoRepository.find({
      where: {
        user: user,
      },
    });
  }

  async update(
    id: string,
    updateCommercialInfoDto: UpdateCommercialInfoDto,
  ): Promise<UpdateResult> {
    try {
      return await this.commercialInfoRepository.update(id, {
        ...updateCommercialInfoDto,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      return await this.commercialInfoRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
