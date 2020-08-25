import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';
import { emailTemplate } from '../../../shared/interface/email/email-template.interface';
import * as config from 'config'

const username = process.env.SMTP_USERNAME;
const emailConfig = config.get('email');

@Injectable()
export class EmailService {
    constructor(
        private readonly mailerService: MailerService
    ) { }

    async sendMail(value: emailTemplate) {
        if (value.from == '' || value.from == null) {
            value.from = username;
        }

        if (emailConfig['USE_EMAIL_TESTER'] == 'yes') {
            value.to = emailConfig['EMAIL_TO_TESTER'];
            value.cc = '';
            value.bcc = '';
        }
        this.mailerService.sendMail(value)
    }
}
