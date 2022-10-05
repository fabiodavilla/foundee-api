import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { toBase64 } from 'src/utils/base64';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserImage } from './entities/user-image.entity';

@Injectable()
export class UserImageService {
  constructor(
    @InjectRepository(UserImage)
    private readonly userImageRepository: Repository<UserImage>,
  ) {}

  create(user: User, file: Express.Multer.File): Promise<UserImage> {
    try {
      const newImage = new UserImage();
      newImage.id = user;
      newImage.imageString = toBase64(file);

      return this.userImageRepository.save(newImage);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(user: User, file: Express.Multer.File): Promise<UpdateResult> {
    try {
      const image = await this.userImageRepository.find({
        where: { id: user.id },
      });

      image[0].imageString = toBase64(file);

      return this.userImageRepository.update(user.id, { ...image[0] });
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(user: User): Promise<DeleteResult> {
    const image = await this.userImageRepository.findOne(user.id);
    image.id = user;

    return await this.userImageRepository.delete(image);
  }
}
