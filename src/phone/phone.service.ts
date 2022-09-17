import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { Phone } from './entities/phone.entity';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(Phone)
    private readonly phoneRepository: Repository<Phone>,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async create(id: string, createPhoneDto: CreatePhoneDto) {
    try {
      const newPhone = new Phone();
      const user = await this.userService.findOneById(id);

      newPhone.user = user;
      newPhone.number = createPhoneDto.number;

      const phoneResult = this.phoneRepository.create(newPhone);

      return this.phoneRepository.save(phoneResult);
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    return this.phoneRepository.find();
  }

  findOne(id: string) {
    return this.phoneRepository.findOne(id);
  }

  findAllByIdUser(idUser: string) {
    const user = this.userService.findOneById(idUser);

    return this.phoneRepository.find({
      where: {
        user: user,
      },
    });
  }

  async update(id: string, updatePhoneDto: UpdatePhoneDto) {
    return this.phoneRepository.update(id, { ...updatePhoneDto });
  }

  remove(id: string) {
    return this.phoneRepository.delete(id);
  }
}
