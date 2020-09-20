import { Module } from '@nestjs/common';
import { RealcountController } from './controller/realcount.controller';
import { RealcountService } from './service/realcount.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DptV } from '../../module/konstituen/entity/view/DptV.entity';
import { DptEntity } from '../../module/konstituen/entity/dpt.entity';

@Module({
    imports: [TypeOrmModule.forFeature([DptV,DptEntity])],
  controllers: [RealcountController],
  providers: [RealcountService]
})
export class RealcountModule {}
