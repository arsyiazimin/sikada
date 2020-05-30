import { AppModule } from "../../app.module";
import { emailTemplate } from "../interface/email/email-template.interface";
import * as config from 'config'

const username = process.env.SMTP_USERNAME;
const emailConfig = config.get('email');

export function sendEmail(value: emailTemplate) {
    if (value.from == '' || value.from == null) {
        value.from = username;
    }

    if (emailConfig['USE_EMAIL_TESTER'] == 'yes') {
        value.to = emailConfig['EMAIL_TO_TESTER'];
        value.cc = '';
        value.bcc = '';
    }

    AppModule.mailer.sendMail(value);
}