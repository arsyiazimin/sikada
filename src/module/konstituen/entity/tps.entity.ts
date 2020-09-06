import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Kelurahan } from "./kelurahan.entity";
import { tKelTps } from "./tpKel.entity";

@Entity('m_tps')
export class TpsEntity {
    @PrimaryGeneratedColumn()
    id_tps: number;

    @Column()
    nama_tps: string;

    @Column()
    status_id: number;

    @OneToMany(type => tKelTps, t => t.TPS, { cascade: ['insert', 'update'], onDelete: 'CASCADE' })
    T_KEL_TPS: tKelTps[]
}