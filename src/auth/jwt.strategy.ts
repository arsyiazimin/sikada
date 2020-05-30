import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Configuration } from '../shared/configuration/configuratio.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: Configuration.SECRET,
        }
            // async (req: Request, payload: any, next: Function) => await this.validate(req, payload, next)
        );
    }

    async validate(payload: JwtPayload, done: Function) {
        const user = await this.authService.validateUser(payload);
        if (!user['user']) {
            return done(new UnauthorizedException(), false);
        }
        done(null, user);
    }
}
