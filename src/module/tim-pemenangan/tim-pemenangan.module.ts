import { Module } from '@nestjs/common';
import { TimPemenanganController } from './controller/tim-pemenangan.controller';
import { TimPemenanganService } from './service/tim-pemenangan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimPemenangan } from '../../module/konstituen/entity/tim-pemenangan.entity';
import { timList } from './entity/timList.entity';
import { DptEntity } from '../../module/konstituen/entity/dpt.entity';



@Module({
  imports: [TypeOrmModule.forFeature([TimPemenangan, timList, DptEntity])],
  controllers: [TimPemenanganController],
  providers: [TimPemenanganService]
})
export class TimPemenanganModule {}
