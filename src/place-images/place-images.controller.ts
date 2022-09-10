import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PlaceImagesService } from './place-images.service';
import { CreatePlaceImageDto } from './dto/create-place-image.dto';
import { UpdatePlaceImageDto } from './dto/update-place-image.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Place Images')
@Controller('place-images')
export class PlaceImagesController {
  constructor(private readonly placeImagesService: PlaceImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createPlaceImageDto: CreatePlaceImageDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.placeImagesService.create(createPlaceImageDto, file);
  }

  @Get('by-place/:idPlace')
  findAllByPlaceId(@Param('idPlace', new ParseUUIDPipe()) idPlace: string) {
    return this.placeImagesService.findAllByPlaceId(idPlace);
  }

  @Get(':id')
  findOneById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.placeImagesService.findOneById(id);
  }

  @Patch()
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Body() updatePlaceImageDto: UpdatePlaceImageDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.placeImagesService.update(updatePlaceImageDto, file);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.placeImagesService.remove(id);
  }
}
