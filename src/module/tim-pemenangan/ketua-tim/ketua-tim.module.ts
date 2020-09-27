import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KetuaTim } from '../entity/ketua-tim.entity';
import { KetuaTimController } from './controller/ketua-tim.controller';
import { KetuaTimService } from './service/ketua-tim.service';

@Module({
    imports: [TypeOrmModule.forFeature([KetuaTim])],
    controllers: [KetuaTimController],
    providers: [KetuaTimService]
  })
export class KetuaTimModule {

}
