import { Entity, PrimaryColumn, Column, AdvancedConsoleLogger, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { UserLogin } from 'global/user/entity/user-login.entity';

@Entity('m_employee')
export class Employee {
    @PrimaryGeneratedColumn()
    EMP_ID: number;

    @Column()
    EMP_NAME: string;

    @Column()
    JOB_TITLE_ID: number;

    @Column()
    DIV_ID: number;

    @Column()
    EMAIL: string;

    @Column()
    STATUS_ID: number;

    @OneToOne(type => UserLogin, usr => usr.EMPLOYEE, { cascade: ["insert", "update"], onDelete: 'CASCADE' })
    USER_LOGIN: UserLogin
}