import { Module } from '@nestjs/common';
import { ConfigurationService } from './configuration/configuration.service';
import { EmailService } from './mailer/email-service/email-service.service';

@Module({
  providers: [ConfigurationService, EmailService],
  exports: [ConfigurationService, EmailService]
})
export class SharedModule {}
