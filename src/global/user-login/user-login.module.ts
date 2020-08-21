import { Module } from '@nestjs/common';
import { UserLoginService } from './services/user-login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLogin } from './entity/userLogin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserLogin])
  ],
  providers: [UserLoginService]
})
export class UserLoginModule { }
