import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimPemenangan } from 'module/konstituen/entity/tim-pemenangan.entity';
import { KetuaTim } from '../entity/ketua-tim.entity';
import { KetuaTimController } from './controller/ketua-tim.controller';
import { KetuaTimService } from './service/ketua-tim.service';

@Module({
    imports: [TypeOrmModule.forFeature([KetuaTim, TimPemenangan])],
    controllers: [KetuaTimController],
    providers: [KetuaTimService]
  })
export class KetuaTimModule {

}
