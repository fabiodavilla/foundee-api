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
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import placesResponse from 'src/common/api-documentation/placesResponse';

@ApiTags('Places')
@UseGuards(JwtAuthGuard)
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  @ApiResponse(placesResponse.createOkResponse)
  @ApiResponse(placesResponse.createBadResponse)
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placesService.create(createPlaceDto);
  }

  @Get()
  @ApiResponse(placesResponse.getAllOkResponse)
  @ApiResponse(placesResponse.getAllBadResponse)
  findAll() {
    return this.placesService.findAll();
  }

  @Get(':id')
  @ApiResponse(placesResponse.getByIdOkResponse)
  @ApiResponse(placesResponse.getByIdBadResponse)
  findOneById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.placesService.findOneById(id);
  }

  @Get('by-commercial-info/:idCommInfo')
  @ApiResponse(placesResponse.getByCommercialInfoOkResponse)
  @ApiResponse(placesResponse.getByCommercialInfoBadResponse)
  findAllByCommercialInfo(
    @Param('idCommInfo', new ParseUUIDPipe()) idCommInfo: string,
  ) {
    return this.placesService.findAllByCommercialInfo(idCommInfo);
  }

  @Patch(':id')
  @ApiResponse(placesResponse.updateOkResponse)
  @ApiResponse(placesResponse.updateBadResponse)
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePlaceDto: UpdatePlaceDto,
  ) {
    return this.placesService.update(id, updatePlaceDto);
  }

  @Delete(':id')
  @ApiResponse(placesResponse.removeOkResult)
  @ApiResponse(placesResponse.removeBadResult)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.placesService.remove(id);
  }
}
