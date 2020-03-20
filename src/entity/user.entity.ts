import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
    GHOST = 'ghost',
    USER = 'user',
    ADMIN = 'admin',
}

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', length : 255})
    username!: string;

    @Column({type: 'varchar', length: 255})
    email!: string;

    @Column({type: 'varchar', length: 255})
    password!: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    avatar?: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.GHOST,
    })
    role!: UserRole;

    @Column({ type: 'boolean', default: false})
    activated!: boolean;

}
