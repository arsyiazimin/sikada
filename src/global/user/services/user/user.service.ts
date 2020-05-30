import { Injectable } from '@nestjs/common';
import * as md5 from 'md5';
import { Repository, getManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLogin } from "../../entity/user-login.entity";
import { SignupDTO } from 'auth/dto/signup.dto';
import { Employee } from 'global/employee/entity/Employee.entity';
import * as bcrypt from 'bcrypt';
import { PasswordHasherService } from '../hasher/password-hasher/password-hasher.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserLogin) private readonly userRepository: Repository<UserLogin>,
        @InjectRepository(Employee) private readonly EmployeeRepository: Repository<Employee>,
        private passwordHasher: PasswordHasherService
    ) { }

    async signup(data: SignupDTO) {
        const entityManager = getManager();
        const connection = entityManager.connection;
        const queryRunner = await connection.createQueryRunner();
        let result: any;
        await queryRunner.startTransaction();
        try {
            const hasPassword = this.passwordHasher.hasPassword(data.password);
            let dataReady = {
                EMP_NAME: data.emp_name,
                EMAIL: data.email,
                STATUS_ID: 1,
                DIV_ID: 1,
                USER_LOGIN: {
                    STATUS_ID: 1,
                    LOGIN_CODE: data.email,
                    LOGIN_PASS: (await hasPassword).LOGIN_PASS,
                    SPASS: (await hasPassword).SPASS,
                    IS_DEV: 0
                }
            }
            const main = await this.EmployeeRepository.create(dataReady);

            /* Action Save */
            await queryRunner.manager.save(main).then(aa => {
            }).catch(async err => {
                throw new Error(err);
            });

            console.log(main)
            // await queryRunner.rollbackTransaction();
            await queryRunner.commitTransaction();
            result = { result: main['EMP_ID'], error_bit: false }
        } catch (error) {
            console.log(error.message)
            await queryRunner.rollbackTransaction();
            result = { result: error.message, error_bit: true }
        } finally {
            await queryRunner.release();
        }
        return result
    }

    async adminUser() {
        const result = this.userRepository.find({ EMP_ID: 180 });
        return result;
    }

    async getUserByUsername(username: string): Promise<UserLogin> {
        username = username.toLowerCase();
        const user = await getManager()
            .createQueryBuilder(UserLogin, "user")
            .leftJoinAndSelect("Employee", "emp", 'emp.EMP_ID = user.EMP_ID')
            .where("LOWER(user.LOGIN_CODE) = :emp_username AND user.STATUS_ID = :status_id", { emp_username: username, status_id: 1 })
            .getOne();
        return user;
    }
}
