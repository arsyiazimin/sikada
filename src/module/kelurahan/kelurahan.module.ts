import { Module } from '@nestjs/common';
import { KelurahanController } from './controller/kelurahan.controller';
import { KelurahanService } from './service/kelurahan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kelurahan } from '../../module/konstituen/entity/kelurahan.entity';
import { KelurahanListEntity } from '../../module/konstituen/entity/view/kelurahan-list.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Kelurahan,KelurahanListEntity])],
  controllers: [KelurahanController],
  providers: [KelurahanService]
})
export class KelurahanModule {}
