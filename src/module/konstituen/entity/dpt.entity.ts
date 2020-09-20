import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { Kecamatan } from "./kecamatan.entity";
import { TimPemenangan } from "./tim-pemenangan.entity";
import { KecamatanListEntity } from "./view/kecamatan-list.entity";
import { KelurahanListEntity } from "./view/kelurahan-list.entity";

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
    id_tim: number;

    @Column()
    id_kecamatan: number;

    @Column()
    id_kelurahan: number;

    @Column()
    id_tps: number;

    @Column()
    create_id: number;

    @Column()
    create_date: Date;

    @Column()
    update_id: number;

    @Column()
    update_date: Date;

    @Column()
    ketua_bit: number

    @Column()
    anggota_bit: number

    @Column()
    kawin: string;

    @Column()
    keterangan: string;

    @Column()
    difabel: string;

    @Column()
    status_id: number;

    @ManyToOne(type => Kecamatan, kec => kec.DPT, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_kecamatan' })
    KECAMATAN: Kecamatan

    // @ManyToOne(type => TimPemenangan, tim => tim.DPT, { cascade: true, onDelete: 'CASCADE' })
    // tim_dpt: TimPemenangan

    // @ManyToOne(type => TimPemenangan, tim => tim.DPT, { cascade: true, onDelete: 'CASCADE' })
    // ketua_tim: TimPemenangan

}