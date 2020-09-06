import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { TpsEntity } from "./tps.entity";
import { Kecamatan } from "./kecamatan.entity";
import { tKelTps } from "./tpKel.entity";

@Entity('m_kelurahan')
export class Kelurahan {
    @PrimaryGeneratedColumn()
    id_kelurahan: number;

    @Column()
    nama_kelurahan: string;

    @Column()
    id_kecamatan: number;

    @Column()
    status_id: number

    @ManyToOne(type => Kecamatan, kec => kec.KELURAHAN, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({name: 'id_kecamatan'})
    KECAMATAN: Kecamatan

    @OneToMany(type => tKelTps, t => t.KELURAHAN, { cascade: ['insert', 'update'], onDelete: 'CASCADE' })
    T_KEL_TPS: tKelTps[]

}