import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('attempt')
export class Attempt {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', length : 6})
    code!: string;

    @Column({type: 'boolean', default: false})
    isCorrect!: boolean;

    @Column({type: 'int', default: 1})
    voices!: number;

    @CreateDateColumn({type: 'timestamp'})
    date!: Date;

    @Column({type: 'varchar'})
    codeDate!: string;

    @ManyToOne(type => User, user => user.attempts)
    user!: User;
}
