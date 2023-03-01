import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import authResponse from 'src/common/api-documentation/authResponse';
import { BaseController } from 'src/common/BaseController';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super();
  }

  @Post('login')
  @ApiResponse(authResponse.removeOkResponse)
  @ApiResponse(authResponse.removeBadResponse)
  async login(@Body() body: LoginDto) {
    const res = await this.authService.login(body);

    return res ? this.Ok(res) : this.BadRequest('Could not login');
  }
}
