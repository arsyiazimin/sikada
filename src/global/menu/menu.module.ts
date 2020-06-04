import { Module } from '@nestjs/common';
import { MenuService } from './services/menu/menu.service';
import { MenuController } from './controllers/menu/menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entity/menu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Menu
    ])
  ],
  providers: [MenuService],
  controllers: [MenuController]
})
export class MenuModule {}
