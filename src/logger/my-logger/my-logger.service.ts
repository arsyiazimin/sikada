import { LoggerService } from '@nestjs/common';

export class MyLoggerService implements LoggerService {
    log(message: string) {}
    error(message: string, trace: string) {}
    warn(message: string){}
}