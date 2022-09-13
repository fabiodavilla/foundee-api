import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { PointService } from './point.service';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import pointResponse from 'src/common/api-documentation/pointResponse';

@ApiTags('Points')
@Controller('points')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @Post()
  @ApiResponse(pointResponse.createOkResponse)
  @ApiResponse(pointResponse.createBadResponse)
  create(@Body() createPointDto: CreatePointDto) {
    return this.pointService.create(createPointDto);
  }

  @Get('location')
  @ApiResponse(pointResponse.getSquareOkResponse)
  @ApiResponse(pointResponse.getSquareBadResponse)
  findAllByLocation(
    @Query('latDown', new ParseIntPipe()) latDown: number,
    @Query('lonDown', new ParseIntPipe()) lonDown: number,
    @Query('latUp', new ParseIntPipe()) latUp: number,
    @Query('lonUp', new ParseIntPipe()) lonUp: number,
  ) {
    return this.pointService.findAllByLocation(latDown, lonDown, latUp, lonUp);
  }

  @Get(':idUser')
  @ApiResponse(pointResponse.getByUserOkResponse)
  @ApiResponse(pointResponse.getByUserBadResponse)
  findAllByUser(@Param('idUser', new ParseUUIDPipe()) idUser: string) {
    return this.pointService.findAllByUser(idUser);
  }

  @Patch(':id/:idUser')
  @ApiResponse(pointResponse.updateOkResponse)
  @ApiResponse(pointResponse.updateBadResponse)
  update(
    @Param('id') id: string,
    @Param('idUser', new ParseUUIDPipe()) idUser: string,
    @Body() updatePointDto: UpdatePointDto,
  ) {
    return this.pointService.update(id, idUser, updatePointDto);
  }

  @Delete(':id/:idUser')
  @ApiResponse(pointResponse.removeOkResponse)
  @ApiResponse(pointResponse.removeBadResponse)
  remove(
    @Param('id') id: string,
    @Param('idUser', new ParseUUIDPipe()) idUser: string,
  ) {
    return this.pointService.remove(id, idUser);
  }
}
