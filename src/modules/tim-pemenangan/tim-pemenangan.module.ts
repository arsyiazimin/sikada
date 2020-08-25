import { Module } from '@nestjs/common';
import { TimPemenanganController } from './controller/tim-pemenangan.controller';
import { TimPemenanganService } from './service/tim-pemenangan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimPemenangan } from 'modules/konstituen/entity/tim-pemenangan.entity';



@Module({
  imports: [TypeOrmModule.forFeature([TimPemenangan])],
  controllers: [TimPemenanganController],
  providers: [TimPemenanganService]
})
export class TimPemenanganModule {}
