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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import placeCommentsResponse from 'src/common/api-documentation/placeCommentsResponse';

@ApiTags('Place Comments')
@UseGuards(JwtAuthGuard)
@Controller('place-comments')
export class PlaceCommentsController {
  constructor(private readonly placeCommentsService: PlaceCommentsService) {}

  @Post()
  @ApiResponse(placeCommentsResponse.createOkResponse)
  @ApiResponse(placeCommentsResponse.createBadResponse)
  create(@Body() createPlaceCommentDto: CreatePlaceCommentDto) {
    return this.placeCommentsService.create(createPlaceCommentDto);
  }

  @Get(':id')
  @ApiResponse(placeCommentsResponse.getByIdOkResponse)
  @ApiResponse(placeCommentsResponse.getByIdBadResponse)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.placeCommentsService.findOneById(id);
  }

  @Get('by-place/:idPlace')
  @ApiResponse(placeCommentsResponse.getByPlaceOkResponse)
  @ApiResponse(placeCommentsResponse.getByPlaceBadResponse)
  findAllByPlaceId(@Param('idPlace', new ParseUUIDPipe()) idPlace: string) {
    return this.placeCommentsService.findAllByPlaceId(idPlace);
  }

  @Get('by-user/:idUser')
  @ApiResponse(placeCommentsResponse.getByUserOkResponse)
  @ApiResponse(placeCommentsResponse.getByUserBadResponse)
  findAllByUser(@Param('idUser', new ParseUUIDPipe()) idUser: string) {
    return this.placeCommentsService.findAllByUser(idUser);
  }

  @Patch(':id/:idUser')
  @ApiResponse(placeCommentsResponse.updateOkResponse)
  @ApiResponse(placeCommentsResponse.updateBadResponse)
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('idUser', new ParseUUIDPipe()) idUser: string,
    @Body() updatePlaceCommentDto: UpdatePlaceCommentDto,
  ) {
    return this.placeCommentsService.update(id, idUser, updatePlaceCommentDto);
  }

  @Delete(':id/:idUser')
  @ApiResponse(placeCommentsResponse.removeOkResult)
  @ApiResponse(placeCommentsResponse.removeBadResult)
  remove(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('idUser', new ParseUUIDPipe()) idUser: string,
  ) {
    return this.placeCommentsService.remove(id, idUser);
  }
}
