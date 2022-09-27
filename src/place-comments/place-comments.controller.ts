import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { PlaceCommentsService } from './place-comments.service';
import { CreatePlaceCommentDto } from './dto/create-place-comment.dto';
import { UpdatePlaceCommentDto } from './dto/update-place-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Place Comments')
@UseGuards(JwtAuthGuard)
@Controller('place-comments')
export class PlaceCommentsController {
  constructor(private readonly placeCommentsService: PlaceCommentsService) {}

  @Post()
  create(@Body() createPlaceCommentDto: CreatePlaceCommentDto) {
    return this.placeCommentsService.create(createPlaceCommentDto);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.placeCommentsService.findOneById(id);
  }

  @Get('by-place/:idPlace')
  findAllByPlaceId(@Param('idPlace', new ParseUUIDPipe()) idPlace: string) {
    return this.placeCommentsService.findAllByPlaceId(idPlace);
  }

  @Get('by-user/:idUser')
  findAllByUser(@Param('idUser', new ParseUUIDPipe()) idUser: string) {
    return this.placeCommentsService.findAllByUser(idUser);
  }

  @Patch(':id/:idUser')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('idUser', new ParseUUIDPipe()) idUser: string,
    @Body() updatePlaceCommentDto: UpdatePlaceCommentDto,
  ) {
    return this.placeCommentsService.update(id, idUser, updatePlaceCommentDto);
  }

  @Delete(':id/:idUser')
  remove(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('idUser', new ParseUUIDPipe()) idUser: string,
  ) {
    return this.placeCommentsService.remove(id, idUser);
  }
}
