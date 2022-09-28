import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { PlaceImagesService } from './place-images.service';
import { CreatePlaceImageDto } from './dto/create-place-image.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import placeImagesResponse from 'src/common/api-documentation/placeImagesResponse';

@ApiTags('Place Images')
@UseGuards(JwtAuthGuard)
@Controller('place-images')
export class PlaceImagesController {
  constructor(private readonly placeImagesService: PlaceImagesService) {}

  @Post()
  @ApiResponse(placeImagesResponse.createOkResponse)
  @ApiResponse(placeImagesResponse.createBadResponse)
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createPlaceImageDto: CreatePlaceImageDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.placeImagesService.create(createPlaceImageDto, file);
  }

  @Get('by-place/:idPlace')
  @ApiResponse(placeImagesResponse.getAllByPlaceOkResponse)
  @ApiResponse(placeImagesResponse.getAllByPlaceBadResponse)
  findAllByPlaceId(@Param('idPlace', new ParseUUIDPipe()) idPlace: string) {
    return this.placeImagesService.findAllByPlaceId(idPlace);
  }

  @Get(':id')
  @ApiResponse(placeImagesResponse.getByIdOkResponse)
  @ApiResponse(placeImagesResponse.getByIdBadResponse)
  findOneById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.placeImagesService.findOneById(id);
  }

  @Delete(':id')
  @ApiResponse(placeImagesResponse.removeOkResult)
  @ApiResponse(placeImagesResponse.removeBadResult)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.placeImagesService.remove(id);
  }
}
