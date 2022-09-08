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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'An user has been successfully created',
    type: User,
  })
  @ApiResponse({
    status: 500,
    description: 'An information is incorrect',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get a list of all users',
    type: Array<User>,
  })
  @ApiResponse({
    status: 500,
    description: 'Server error',
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get one user info',
    type: User,
  })
  @ApiResponse({
    status: 500,
    description: 'Server error',
  })
  findOneById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findOneById(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Update one or more user info',
    type: UpdateResult,
  })
  @ApiResponse({
    status: 500,
    description: 'Server error',
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Removed user from the system',
    type: DeleteResult,
  })
  @ApiResponse({
    status: 500,
    description: 'Server error',
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.remove(id);
  }

  @Post('profile/upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({
    status: 200,
    description: 'Changed profile picture',
  })
  @ApiResponse({
    status: 500,
    description: 'Server error',
  })
  uploadImage(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.uploadImage(id, file);
  }
}
