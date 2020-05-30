import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from "./entity/Employee.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLogin } from 'global/user/entity/user-login.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, UserLogin])
  ],
  providers: [EmployeeService]
})
export class EmployeeModule {}
