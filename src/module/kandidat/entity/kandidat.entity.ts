import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('kandidat')
export class KandidatEntity {
    @PrimaryGeneratedColumn()
    id_kandidat : number;

    @Column() 
    nama_Kandidat: string;

    @Column()
    nik: number;

    @Column()
    alamat: string;

    @Column()
    tempat_lahir: string

    @Column()
    tanggal_lahir: Date;

}