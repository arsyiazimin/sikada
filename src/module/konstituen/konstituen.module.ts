import { Module } from '@nestjs/common';
import { KonstituenController } from './controller/konstituen.controller';
import { KonstituenService } from './service/konstituen.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TpsEntity } from './entity/tps.entity';
import { Kelurahan } from './entity/kelurahan.entity';
import { Kecamatan } from './entity/kecamatan.entity';
import { DptEntity } from './entity/dpt.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tKelTps } from './entity/tpKel.entity';
import { DptV } from './entity/view/DptV.entity';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        filename: (req, file, cb) => {
          let name = file.originalname.split('.').slice(0, -1)
          const randomName = `${name}`
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }),
    TypeOrmModule.forFeature([
      TpsEntity,
      Kelurahan,
      Kecamatan,
      DptEntity,
      tKelTps,
      DptV
    ])
  ],
  controllers: [KonstituenController],
  providers: [KonstituenService]
})
export class KonstituenModule { }
