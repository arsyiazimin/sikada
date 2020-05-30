import { Entity, PrimaryColumn, Column, AdvancedConsoleLogger, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from 'global/employee/entity/Employee.entity';

@Entity('t_user_login')
export class UserLogin {
    @PrimaryGeneratedColumn()
    LOGIN_ID: number;

    @Column()
    EMP_ID: number;

    @Column()
    STATUS_ID: number;

    @Column()
    LOGIN_CODE: string;

    @Column()
    LOGIN_PASS: string;
    
    @Column()
    SPASS: string;

    @Column()
    IS_DEV: number;

    @OneToOne(type => Employee, emp => emp.USER_LOGIN, { cascade: ["insert", "update"], onDelete: 'CASCADE'})
    @JoinColumn({name: 'EMP_ID'})
    EMPLOYEE: Employee

}