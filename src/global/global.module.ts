import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { MenuModule } from './menu/menu.module';
import { UserModule } from './user/user.module';
import { UserLoginModule } from './user-login/user-login.module';

@Module({
  imports: [MenuModule, UserModule, UserLoginModule]
})
export class GlobalModule {}
