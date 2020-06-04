import { Injectable, Inject } from '@nestjs/common';
import { UserService } from 'global/user/services/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigurationService } from 'shared/configuration/configuration.service';
import { Configuration } from 'shared/configuration/configuratio.enum';
import * as conf from '../../config/default';
import { AuthInterfaces } from './interfaces/auth.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    static expired: number | string;
    username = process.env.SMTP_USERNAME;

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly _configurationService: ConfigurationService,
        // @Inject('MailerProvider') private readonly mailerProvider
    ) {
        AuthService.expired = _configurationService.get(Configuration.JWT_EXPIRED);
    }

    async createToken(id: number, username: string) {
        let image_url = '';
        let image_path = '';
        let division_code = null;
        let division_name = null;
        const empData = await this.userService.getEmployee(id);
        const images = ''
        const main_company_id = 0;
        const job_title_id = empData.JOB_TITLE_ID;
        const division_id = empData.DIV_ID;
        // if (empData[0].DIVISION_ID > 0) {
        //     division_code = '';
        //     division_name = '';
        // }
        const employee_name = empData.EMP_NAME;
        const company_name = '';
        const company_code = '';
        const company_logo = '';
        const job_title = '';
        const mobile_phone = '';
        const today = new Date()
        today.setSeconds(today.getSeconds() + conf.default.DAILY_EXPIRED)

        if (images) {
            // image_path = images.PATH_LOCATION + '' + images.FILE_NAME;
            // image_url = image_path;
        }
        const user: AuthInterfaces = {
            id,
            username,
            employee_name,
            main_company_id,
            company_name,
            company_code,
            job_title_id,
            job_title,
            division_id,
            division_code,
            division_name,
            image_url,
            company_logo,
            mobile_phone,
            daily_exp: conf.default.DAILY_EXPIRED,
            daily_date: today
        };
        const accessToken = this.jwtService.sign(user);
        console.log(accessToken)
        return {
            expiresIn: AuthService.expired,
            accessToken,
        };
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        if (payload && payload.username) {
            const user = await this.userService.getUserByUsername(payload.username);
            // const role = await this._roleAssign.getAssigns(payload.id);
            // const user = '';
            const role = '';
            return await {
                user,
                assign: role,
            };
        }
        return {};
    }
}
