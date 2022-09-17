import { Module } from '@nestjs/common';
import { PlaceCommentsService } from './place-comments.service';
import { PlaceCommentsController } from './place-comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceComment } from './entities/place-comment.entity';
import { UserModule } from 'src/user/user.module';
import { PlacesModule } from 'src/places/places.module';

@Module({
  imports: [UserModule, PlacesModule, TypeOrmModule.forFeature([PlaceComment])],
  controllers: [PlaceCommentsController],
  providers: [PlaceCommentsService],
})
export class PlaceCommentsModule {}
