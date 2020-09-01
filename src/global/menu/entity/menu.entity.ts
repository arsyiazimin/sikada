import { Entity, PrimaryColumn, Column, AdvancedConsoleLogger, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('m_menu')
export class Menu {
    @PrimaryGeneratedColumn()
    MENU_ID: number;

    @Column()
    TITLE: string;

    @Column()
    ICON: string;

    @Column()
    TYPE: string;

    @Column()
    BADGE_TYPE: string;
    
    @Column()
    BADGE_VALUE: string;

    @Column()
    ACTIVE: number;

    @Column()
    PATH: string;

    @Column()
    BOOKMARK: number;

    @Column()
    PARENT_ID: number;

    @Column()
    IS_ACTIVE: number;
    
    @Column()
    CONDITION: string;

    @Column()
    ORDER: number;

}