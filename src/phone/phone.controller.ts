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

@Controller('phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Post(':id')
  create(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() createPhoneDto: CreatePhoneDto,
  ) {
    return this.phoneService.create(id, createPhoneDto);
  }

  @Get()
  findAll() {
    return this.phoneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.phoneService.findOne(id);
  }

  @Get('all/:idUser')
  findAllByIdUser(@Param('idUser', new ParseUUIDPipe()) idUser: string) {
    return this.phoneService.findAllByIdUser(idUser);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePhoneDto: UpdatePhoneDto,
  ) {
    return this.phoneService.update(id, updatePhoneDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.phoneService.remove(id);
  }
}
