import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { UserModule } from './user/user.module';
import { SharedModule } from 'shared/shared.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [EmployeeModule, UserModule, MenuModule]
})
export class GlobalModule {}
