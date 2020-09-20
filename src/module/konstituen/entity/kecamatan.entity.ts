import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Kelurahan } from "./kelurahan.entity";
import { DptEntity } from "./dpt.entity";

@Entity('m_kecamatan')
export class Kecamatan {
    @PrimaryGeneratedColumn()
    id_kecamatan: number;

    @Column()
    nama_kecamatan: string;

    @Column()
    status_id: number

    KEL: Kelurahan

    @OneToMany(type => DptEntity, dpt => dpt.KECAMATAN, { cascade: ['insert', 'update'], onDelete: 'CASCADE' })
    DPT: DptEntity[]

    @OneToMany(type => Kelurahan, kel => kel.KECAMATAN, { cascade: ['insert', 'update'], onDelete: 'CASCADE' })
    KELURAHAN: Kelurahan[]

}