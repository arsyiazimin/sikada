import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Kecamatan } from "./kecamatan.entity";

@Entity('m_dpt')
export class DptEntity {
    @PrimaryGeneratedColumn()
    id_dpt: number;

    @Column()
    no_kk: String;

    @Column()
    nik: string;

    @Column()
    nama: string;

    @Column()
    tempat_lahir: string;

    @Column()
    tanggal_lahir: string;

    @Column()
    jenis_kelamin: string;

    @Column()
    alamat: string;

    @Column()
    rt: string;

    @Column()
    rw: string;

    @Column()
    id_kecamatan: number;

    @ManyToOne(type => Kecamatan, kec => kec.DPT, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_kecamatan' })
    KECAMATAN: Kecamatan
}