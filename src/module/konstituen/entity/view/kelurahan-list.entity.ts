import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";
import { DptEntity } from "../dpt.entity";
import { tKelTps } from "../tpKel.entity";

@Entity('kelurahan_list')
export class KelurahanListEntity {
    @PrimaryGeneratedColumn()
    id_kelurahan: string;

    @Column()
    nama_kecamatan: string;

    @Column()
    nama_kelurahan: string;

    @Column()
    jumlah_tps: number;

    @Column()
    jumlah_dpt: number;

    @Column()
    status_id: number

    @Column()
    id_kecamatan: number

}