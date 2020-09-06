import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { DptEntity } from "./dpt.entity";

@Entity('m_tim')
export class TimPemenangan {
    @PrimaryGeneratedColumn()
    id_tim: number;

    @Column()
    nama_tim: string;

    @Column()
    nama_ketua: string;

    @Column()
    status_id: number;

    @Column()
    deskripsi: string;

    // @OneToMany(type => DptEntity, dpt => dpt.tim_dpt)
    // DPT: DptEntity

    // @OneToOne(type => DptEntity, ketua_dpt => ketua_dpt.tim_dpt)
    // ketua_tim: DptEntity
}