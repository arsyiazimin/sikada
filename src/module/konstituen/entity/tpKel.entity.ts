import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Kelurahan } from "./kelurahan.entity";
import { TpsEntity } from "./tps.entity";

@Entity('t_kelurahan_tps')
export class tKelTps {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_kelurahan: number;

    @Column()
    id_tps: number;

    @ManyToOne(type => Kelurahan, kel => kel.T_KEL_TPS, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_kelurahan' })
    KELURAHAN: Kelurahan

    @ManyToOne(type => TpsEntity, tps => tps.T_KEL_TPS, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_tps' })
    TPS: TpsEntity
}