import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('tim_list')
export class timList {
    @PrimaryColumn()
    id_tim: number

    @Column()
    nama_tim: string

    @Column()
    nama_ketua: string

    @Column()
    deskripsi: string;

    @Column()
    status_id: number

    @Column()
    konstituen: number
}