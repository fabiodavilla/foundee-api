import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import userResponse from 'src/common/api-documentation/userResponse';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse(userResponse.createOkResponse)
  @ApiResponse(userResponse.createBadResponse)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiResponse(userResponse.getAllOkResponse)
  @ApiResponse(userResponse.getAllBadResponse)
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse(userResponse.getByIdOkResponse)
  @ApiResponse(userResponse.getByIdBadResponse)
  @UseGuards(JwtAuthGuard)
  findOneById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findUserById(id);
  }

  @Patch(':id')
  @ApiResponse(userResponse.updateOkResponse)
  @ApiResponse(userResponse.updateBadResponse)
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse(userResponse.removeOkResult)
  @ApiResponse(userResponse.removeBadResult)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.remove(id);
  }

  @Post('profile/upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse(userResponse.changeProfilePictureOkResponse)
  @ApiResponse(userResponse.changeProfilePictureBadResponse)
  @UseGuards(JwtAuthGuard)
  uploadImage(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.uploadImage(id, file);
  }

  @Patch('profile/upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse(userResponse.updateProfilePictureOkResponse)
  @ApiResponse(userResponse.updateProfilePictureBadResponse)
  @UseGuards(JwtAuthGuard)
  updateImage(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.updateImage(id, file);
  }

  @Delete('profile/upload/:id')
  @ApiResponse(userResponse.removeProfilePictureOkResponse)
  @ApiResponse(userResponse.removeProfilePictureBadResponse)
  @UseGuards(JwtAuthGuard)
  removeImage(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.removeImage(id);
  }
}
