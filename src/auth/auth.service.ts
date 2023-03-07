import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { UserNoPassword } from './dto/user-no-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserNoPassword> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === pass) {
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
    const checkedUser = await this.validateUser(user.email, user.password);

    if (!checkedUser) return false;

    const payload = { idUser: checkedUser.id, email: checkedUser.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
