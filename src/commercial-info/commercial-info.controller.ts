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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import commercialInfoDocumentation from 'src/common/api-documentation/commercialInfoResponse';
import { CommercialInfoService } from './commercial-info.service';
import { CreateCommercialInfoDto } from './dto/create-commercial-info.dto';
import { UpdateCommercialInfoDto } from './dto/update-commercial-info.dto';

@ApiTags('Commercial Info')
@UseGuards(JwtAuthGuard)
@Controller('commercial-info')
export class CommercialInfoController {
  constructor(private readonly commercialInfoService: CommercialInfoService) {}

  @Post()
  @ApiResponse(commercialInfoDocumentation.createOkResponse)
  @ApiResponse(commercialInfoDocumentation.createBadResponse)
  create(@Body() createCommercialInfoDto: CreateCommercialInfoDto) {
    return this.commercialInfoService.create(createCommercialInfoDto);
  }

  @Get()
  @ApiResponse(commercialInfoDocumentation.getAllOkResponse)
  @ApiResponse(commercialInfoDocumentation.getAllBadResponse)
  findAll() {
    return this.commercialInfoService.findAll();
  }

  @Get(':id')
  @ApiResponse(commercialInfoDocumentation.getByIdOkResponse)
  @ApiResponse(commercialInfoDocumentation.getByIdBadResponse)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.commercialInfoService.findOne(id);
  }

  @Get('by-user/:idUser')
  @ApiResponse(commercialInfoDocumentation.getByUserOkResponse)
  @ApiResponse(commercialInfoDocumentation.getByUserBadResponse)
  findAllByUser(@Param('idUser', new ParseUUIDPipe()) idUser: string) {
    return this.commercialInfoService.findAllByUser(idUser);
  }

  @Patch(':id')
  @ApiResponse(commercialInfoDocumentation.updateOkResponse)
  @ApiResponse(commercialInfoDocumentation.updateBadResponse)
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCommercialInfoDto: UpdateCommercialInfoDto,
  ) {
    return this.commercialInfoService.update(id, updateCommercialInfoDto);
  }

  @Delete(':id')
  @ApiResponse(commercialInfoDocumentation.removeOkResult)
  @ApiResponse(commercialInfoDocumentation.removeBadResult)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.commercialInfoService.remove(id);
  }
}
