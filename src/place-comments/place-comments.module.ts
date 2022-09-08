import { Module } from '@nestjs/common';
import { PlaceCommentsService } from './place-comments.service';
import { PlaceCommentsController } from './place-comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceComment } from './entities/place-comment.entity';
import { Place } from 'src/places/entities/place.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlaceComment, Place, User])],
  controllers: [PlaceCommentsController],
  providers: [PlaceCommentsService],
})
export class PlaceCommentsModule {}
