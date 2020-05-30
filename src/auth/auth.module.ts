import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from '../global/user/user.module';
import { Configuration } from '../shared/configuration/configuratio.enum';
import { ConfigurationService } from '../shared/configuration/configuration.service';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'global/user/services/user/user.service';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: Configuration.SECRET,
      signOptions: {
        expiresIn: new ConfigurationService().get(Configuration.JWT_EXPIRED),
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ConfigurationService],
})
export class AuthModule { }
