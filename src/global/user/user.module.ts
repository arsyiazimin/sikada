import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { HashService } from './services/hash.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserLogin } from '../../global/user-login/entity/userLogin.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserLogin])
    ],
    providers: [UserService, HashService],
    exports: [UserService, HashService]
})
export class UserModule { }
