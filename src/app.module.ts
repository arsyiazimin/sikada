import { Module, NestModule, MiddlewareConsumer, RequestMethod, Inject } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { ConfigurationService } from './shared/configuration/configuration.service';
import { Configuration } from './shared/configuration/configuratio.enum';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { MailerModule } from '@nest-modules/mailer';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';
// import { UserModule } from './global/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EverytingSubscriber } from 'common/subscriber/EverythingSubscriber';
import { GlobalModule } from './global/global.module';
import { typeOrmConfig } from "./config/typeorm.config";
import { mailerConfig } from "./config/mailer.config";
import { KonstituenModule } from './module/konstituen/konstituen.module';
import { TpsModule } from './module/tps/tps.module';
import { KelurahanModule } from './module/kelurahan/kelurahan.module';
import { KecamatanModule } from './module/kecamatan/kecamatan.module';
import { TimPemenanganModule } from './module/tim-pemenangan/tim-pemenangan.module';
import { Connection } from 'typeorm';
import { RealcountModule } from './module/realcount/realcount.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    SharedModule,
    LoggerModule,
    AuthModule,
    GlobalModule,
    MailerModule.forRoot(mailerConfig),
    KonstituenModule,
    TpsModule,
    KelurahanModule,
    KecamatanModule,
    TimPemenanganModule,
    RealcountModule,
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }

  static host: string;
  static port: number | string;
  static isDev: boolean;
  static mailer: any;


  constructor(
    // @Inject('MailerProvider') private readonly mailerProvider,
    private readonly _configurationService: ConfigurationService,
    private readonly connection: Connection
  ) {
    console.log('connectin status : ', connection.isConnected)
    // constructor(private readonly _configurationService: ConfigurationService) {

    AppModule.port = AppModule.normalizePort(
      _configurationService.get(Configuration.PORT),
    );
    AppModule.host = _configurationService.get(Configuration.HOST);
    AppModule.isDev = _configurationService.isDevelopment;
    // AppModule.mailer = mailerProvider;
    console.log(process.env.SMTP_USERNAME)
    console.log(process.env.SMTP_PASSWORD)
    console.log(process.env.SMTP_HOST)
    console.log(process.env.SMTP_PORT)
  }

  private static normalizePort(param: number | string): number | string {
    const portNumber: number =
      typeof param === 'string' ? parseInt(param, 10) : param;
    if (isNaN(portNumber)) return param;
    else if (portNumber >= 0) return portNumber;
  }
}
