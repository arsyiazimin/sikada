import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('m_setting_column')
export class settingCol {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    value: string;

    @Column()
    naming: string;

    @Column()
    hidden: string;

    @Column()
    date_field: string;

    @Column()
    currency_field: string;
}