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
import { PhoneService } from './phone.service';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { ApiResponse } from '@nestjs/swagger';
import phoneResponse from 'src/common/api-documentation/phoneResponse';

@Controller('phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Post(':id')
  @ApiResponse(phoneResponse.createOkResponse)
  @ApiResponse(phoneResponse.createBadResponse)
  create(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() createPhoneDto: CreatePhoneDto,
  ) {
    return this.phoneService.create(id, createPhoneDto);
  }

  @Get()
  @ApiResponse(phoneResponse.getAllOkResponse)
  @ApiResponse(phoneResponse.getAllBadResponse)
  findAll() {
    return this.phoneService.findAll();
  }

  @Get(':id')
  @ApiResponse(phoneResponse.getOneOkResponse)
  @ApiResponse(phoneResponse.getOneBadResponse)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.phoneService.findOne(id);
  }

  @Get('all/:idUser')
  @ApiResponse(phoneResponse.getAllByIdOkResponse)
  @ApiResponse(phoneResponse.getAllByIdBadResponse)
  findAllByIdUser(@Param('idUser', new ParseUUIDPipe()) idUser: string) {
    return this.phoneService.findAllByIdUser(idUser);
  }

  @Patch(':id')
  @ApiResponse(phoneResponse.updateOkResponse)
  @ApiResponse(phoneResponse.updateBadResponse)
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePhoneDto: UpdatePhoneDto,
  ) {
    return this.phoneService.update(id, updatePhoneDto);
  }

  @Delete(':id')
  @ApiResponse(phoneResponse.removeOkResponse)
  @ApiResponse(phoneResponse.removeBadResponse)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.phoneService.remove(id);
  }
}
