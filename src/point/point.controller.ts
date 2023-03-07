import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PointService } from './point.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import pointResponse from 'src/common/api-documentation/pointResponse';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Points')
@UseGuards(JwtAuthGuard)
@Controller('points')
export class PointController {
  constructor(private readonly pointService: PointService) {}

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
}
