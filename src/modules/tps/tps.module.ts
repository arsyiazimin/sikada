import { Module } from '@nestjs/common';
import { TpsController } from './controller/tps.controller';
import { TpsService } from './service/tps.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TpsEntity } from 'modules/konstituen/entity/tps.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TpsEntity])],
  controllers: [TpsController],
  providers: [TpsService]
})
export class TpsModule {}
