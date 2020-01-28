import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', length : 255})
    name!: string;

    @Column({type: 'varchar', length: 255})
    email!: string;

    @Column({type: 'varchar', length: 255})
    password!: string;

    @Column({type: 'varchar', length: 255})
    avatar!: string;

    @Column({ type: 'boolean', default: false})
    activated!: boolean;

}

