import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserImageService } from 'src/user-image/user-image.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword } from './encrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(UserImageService)
    private readonly userImageService: UserImageService,
  ) {}

  // Criar usuário com o tipo definido
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.usersRepository.create(createUserDto);
      user.dateBirthday = new Date(createUserDto.date);
      user.password = hashPassword(user.password);
      return this.usersRepository.save(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  // Ler todos os usuários
  findAll(): Promise<Array<User>> {
    return this.usersRepository.find();
  }

  // Ler um usuário pelo ID
  findOneById(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  // Atualizar usuário com o tipo definido e o ID
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      return await this.usersRepository.update(id, { ...updateUserDto });
    } catch (error) {
      throw new Error(error);
    }
  }

  // Deletar usuário pelo ID
  async remove(id: string): Promise<DeleteResult> {
    try {
      return await this.usersRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  // Upload de imagem
  async uploadImage(id: string, file: Express.Multer.File): Promise<boolean> {
    try {
      const user = await this.findOneById(id);

      if (user) {
        const uploaded = await this.userImageService.create(user, file);

        if (uploaded) return true;

        return false;
      } else {
        throw new HttpException(
          'User not found!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  // Update de imagem
  async updateImage(id: string, file: Express.Multer.File): Promise<boolean> {
    try {
      const user = await this.findOneById(id);
      const image = await this.usersRepository.findOneBy(user);

      if (user && image) {
        const uploaded = await this.userImageService.update(user, file);

        return uploaded.affected > 0;
      } else {
        throw new HttpException(
          'User not found!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeImage(id: string): Promise<boolean> {
    try {
      const user = await this.findOneById(id);

      if (user) {
        const result = await this.userImageService.remove(user);

        return result.affected > 0;
      } else
        throw new HttpException(
          'User not found!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    } catch (error) {
      throw new Error(error);
    }
  }
}
