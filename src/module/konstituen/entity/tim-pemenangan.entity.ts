import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { DptEntity } from "./dpt.entity";

@Entity('m_tim')
export class TimPemenangan{
    @PrimaryGeneratedColumn()
    id_tim : number;
    
    @Column()
    nama_tim : string;
    
    @Column()
    status_id: number;

    @OneToMany(type=>DptEntity, dpt=>dpt.tim_dpt)
    dpt_tim:DptEntity

    @OneToOne(type=>DptEntity, ketua_dpt=>ketua_dpt.tim_dpt)
    dpt_ketua:DptEntity
}