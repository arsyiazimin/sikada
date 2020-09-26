import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnggotaTim } from '../entity/anggota-tim.entity';
import { AnggotaTimController } from './controller/anggota-tim.controller';
import { AnggotaTimService } from './service/anggota-tim.service';

@Module({
  imports:[TypeOrmModule.forFeature([AnggotaTim])],
  controllers: [AnggotaTimController],
  providers: [AnggotaTimService]
})
export class AnggotaTimModule {}
