import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Criar usuário com o tipo definido
  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.usersRepository.create(createUserDto);
      user.dateBirthday = new Date(createUserDto.date);
      return this.usersRepository.save(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  // Ler todos os usuários
  findAll() {
    return this.usersRepository.find();
  }

  // Ler um usuário pelo ID
  findOneById(id: string) {
    return this.usersRepository.findOne(id);
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  // Atualizar usuário com o tipo definido e o ID
  update(id: string, updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.email)
        throw new HttpException(
          'Cannot change e-mail from user!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );

      return this.usersRepository.update(id, { ...updateUserDto });
    } catch (error) {
      throw new Error(error);
    }
  }

  // Deletar usuário pelo ID
  remove(id: string) {
    try {
      return this.usersRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  // Upload de imagem
  async uploadImage(id: string, file: Express.Multer.File) {
    try {
      const user = await this.findOneById(id);

      if (user) {
        // user.imageString = file;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
