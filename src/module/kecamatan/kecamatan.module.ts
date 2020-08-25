import { Module } from '@nestjs/common';
import { KecamatanController } from './controller/kecamatan.controller';
import { KecamatanService } from './service/kecamatan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kecamatan } from '../../module/konstituen/entity/kecamatan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kecamatan])],
  controllers: [KecamatanController],
  providers: [KecamatanService]
})
export class KecamatanModule {}
