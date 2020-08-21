import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('t_setting_list')
export class settingList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    user_id: number;

    @Column()
    value: string;

    @Column()
    create_date: Date;

    @Column()
    update_date: Date;
}