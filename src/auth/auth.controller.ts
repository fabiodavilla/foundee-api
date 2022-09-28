import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import authResponse from 'src/common/api-documentation/authResponse';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponse(authResponse.removeOkResponse)
  @ApiResponse(authResponse.removeBadResponse)
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
