import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user/user.service';
import { UserLogin } from "./entity/user-login.entity";
import { Employee } from 'global/employee/entity/Employee.entity';
import { PasswordHasherService } from './services/hasher/password-hasher/password-hasher.service';
import { SharedModule } from 'shared/shared.module';
import { EmailService } from 'shared/mailer/email-service/email-service.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserLogin, Employee])
  ],
  providers: [UserService, PasswordHasherService],
  exports: [UserService, PasswordHasherService]
})
export class UserModule { }
