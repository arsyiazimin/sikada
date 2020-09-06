import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { DptEntity } from "../dpt.entity";
import { Kelurahan } from "../kelurahan.entity";
import { Kecamatan } from "../kecamatan.entity";

@Entity('kecamatan_list')
export class KecamatanListEntity {
    @PrimaryGeneratedColumn()
    id_kecamatan: number;

    @Column()
    nama_kecamatan:string;

    @Column()
    jumlah_dpt: number;

    @Column()
    status_id: number

}