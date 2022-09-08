import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PlaceImagesService } from './place-images.service';
import { CreatePlaceImageDto } from './dto/create-place-image.dto';
import { UpdatePlaceImageDto } from './dto/update-place-image.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Place Images')
@Controller('place-images')
export class PlaceImagesController {
  constructor(private readonly placeImagesService: PlaceImagesService) {}

  @Post()
  create(@Body() createPlaceImageDto: CreatePlaceImageDto) {
    return this.placeImagesService.create(createPlaceImageDto);
  }

  @Get('by-place/:idPlace')
  findAllByPlaceId(@Param('idPlace', new ParseUUIDPipe()) idPlace: string) {
    return this.placeImagesService.findAllByPlaceId(idPlace);
  }

  @Get(':id')
  findOneById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.placeImagesService.findOneById(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePlaceImageDto: UpdatePlaceImageDto,
  ) {
    return this.placeImagesService.update(id, updatePlaceImageDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.placeImagesService.remove(id);
  }
}
