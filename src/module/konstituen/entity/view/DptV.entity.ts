import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('dpt_v')
export class DptV {
    @PrimaryColumn()
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
    nama_kecamatan: string;

    @Column()
    nama_kelurahan: string;

    @Column()
    nama_tps: string;
}