import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('m_tim')
export class TimPemenangan{
    @PrimaryGeneratedColumn()
    id_tim : number;
    
    @Column()
    nama_tim : string;
}