import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hashPassword } from 'src/user/encrypt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === hashPassword(pass)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginDto): Promise<
    | false
    | {
        access_token: string;
      }
  > {
    if (!(await this.validateUser(user.email, user.password))) return false;

    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
