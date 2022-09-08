import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Module({
  imports: [UserService],
  providers: [AuthService],
})
export class AuthModule {}
