import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Configuration } from '../shared/configuration/configuratio.enum';
import { ConfigurationService } from '../shared/configuration/configuration.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../global/user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: Configuration.SECRET,
      signOptions: {
        expiresIn: new ConfigurationService().get(Configuration.JWT_EXPIRED),
        algorithm:'HS256'
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ConfigurationService],
})
export class AuthModule { }
