import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('anggota_tim')
export class AnggotaTim {
    @PrimaryGeneratedColumn()
    id_anggota_tim:number;

    @Column ()
    nik:number;

    @Column()
    nama_anggota:string;

    @Column()
    tempat_lahir:string;

    @Column()
    tanggal_lahir:Date;

    @Column()
    alamat:string;
}