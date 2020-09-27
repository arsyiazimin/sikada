import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KandidatController } from './controller/kandidat.controller';
import { KandidatEntity } from './entity/kandidat.entity';
import { KandidatService } from './service/kandidat.service';


@Module({
  imports:[TypeOrmModule.forFeature([KandidatEntity])],
  controllers: [KandidatController],
  providers: [KandidatService]
})
export class KandidatModule {}
