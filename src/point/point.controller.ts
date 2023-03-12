import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PointService } from './point.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import pointResponse from 'src/common/api-documentation/pointResponse';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { plainToClass } from 'class-transformer';
import { BoundsDto } from './dto/bounds.dto';
import { validate } from 'class-validator';

@ApiTags('Points')
@UseGuards(JwtAuthGuard)
@Controller('points')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @Get('location')
  @ApiResponse(pointResponse.getSquareOkResponse)
  @ApiResponse(pointResponse.getSquareBadResponse)
  async findAllByLocation(@Query('bounds') bounds: string) {
    const boundsDto = plainToClass(BoundsDto, JSON.parse(bounds));
    if ((await validate(boundsDto)).length > 0) {
      throw new HttpException(
        'Bounds validation failed',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.pointService.findAllByLocation(boundsDto);
  }

  @Get(':idUser')
  @ApiResponse(pointResponse.getByUserOkResponse)
  @ApiResponse(pointResponse.getByUserBadResponse)
  findAllByUser(@Param('idUser', new ParseUUIDPipe()) idUser: string) {
    return this.pointService.findAllByUser(idUser);
  }
}
