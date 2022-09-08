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
import { ApiTags } from '@nestjs/swagger';
import { CommercialInfoService } from './commercial-info.service';
import { CreateCommercialInfoDto } from './dto/create-commercial-info.dto';
import { UpdateCommercialInfoDto } from './dto/update-commercial-info.dto';

@ApiTags('Commercial Info')
@Controller('commercial-info')
export class CommercialInfoController {
  constructor(private readonly commercialInfoService: CommercialInfoService) {}

  @Post()
  create(@Body() createCommercialInfoDto: CreateCommercialInfoDto) {
    return this.commercialInfoService.create(createCommercialInfoDto);
  }

  @Get()
  findAll() {
    return this.commercialInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.commercialInfoService.findOne(id);
  }

  @Get('by-user/:idUser')
  findAllByUser(@Param('idUser', new ParseUUIDPipe()) idUser: string) {
    return this.commercialInfoService.findAllByUser(idUser);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCommercialInfoDto: UpdateCommercialInfoDto,
  ) {
    return this.commercialInfoService.update(id, updateCommercialInfoDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.commercialInfoService.remove(id);
  }
}
