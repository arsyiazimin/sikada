import { Module } from '@nestjs/common';
import { SettingColumnController } from './controller/setting-column.controller';
import { SettingColumnService } from './service/setting-column.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { settingCol } from './entity/settingColumn.entity';
import { settingList } from './entity/settingList.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      settingCol,
      settingList
    ])
  ],
  controllers: [SettingColumnController],
  providers: [SettingColumnService]
})
export class SettingColumnModule { }
