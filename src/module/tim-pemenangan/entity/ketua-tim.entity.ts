import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('ketua_tim')
export class KetuaTim {
    @PrimaryGeneratedColumn()
    id_ketua_tim: number;

    @Column()
    nik: string;

    @Column()
    nama_ketua: string;

    @Column()
    tempat_lahir: string;

    @Column()
    tanggal_lahir: Date;

    @Column()
    alamat: string;

    @Column()
    status_id: number
}