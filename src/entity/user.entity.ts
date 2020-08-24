import { Code } from './code.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Attempt } from './attempt.entity';

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
    firstname!: string;

    @Column({type: 'varchar', length : 255})
    lastname!: string;

    @Column({type: 'varchar', length: 255})
    email!: string;

    @Column({type: 'varchar', length: 255})
    password!: string;

    @Column({type: 'varchar', length: 255})
    town!: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    avatar?: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.GHOST,
    })
    role!: UserRole;

    @Column({ type: 'boolean', default: false})
    isActive!: boolean;

    @Column({ type: 'boolean', default: false})
    vip!: boolean;

    @OneToMany(type => Attempt, attempt => attempt.user)
    attempts!: Attempt[];

    @OneToMany(type => Code, code => code.winner)
    codes!: Code[];

}
