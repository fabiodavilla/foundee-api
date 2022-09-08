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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Points')
@Controller('points')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @Post()
  create(@Body() createPointDto: CreatePointDto) {
    return this.pointService.create(createPointDto);
  }

  @Get('location')
  findAllByLocation(
    @Query('latDown', new ParseIntPipe()) latDown: number,
    @Query('lonDown', new ParseIntPipe()) lonDown: number,
    @Query('latUp', new ParseIntPipe()) latUp: number,
    @Query('lonUp', new ParseIntPipe()) lonUp: number,
  ) {
    return this.pointService.findAllByLocation(latDown, lonDown, latUp, lonUp);
  }

  @Get(':idPlace')
  findAllByUser(@Param('idUser', new ParseUUIDPipe()) idUser: string) {
    return this.pointService.findAllByUser(idUser);
  }

  @Patch(':id/:idUser')
  update(
    @Param('id') id: string,
    @Param('idUser', new ParseUUIDPipe()) idUser: string,
    @Body() updatePointDto: UpdatePointDto,
  ) {
    return this.pointService.update(id, idUser, updatePointDto);
  }

  @Delete(':id/:idUser')
  remove(
    @Param('id') id: string,
    @Param('idUser', new ParseUUIDPipe()) idUser: string,
  ) {
    return this.pointService.remove(id, idUser);
  }
}
