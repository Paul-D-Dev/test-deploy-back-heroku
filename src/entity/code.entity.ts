import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('code')
export class Code {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', length : 6})
    response!: string;

    @Column({type: 'boolean', default: false})
    isFound!: boolean;

    @Column({type: 'varchar'})
    date!: string;

    @ManyToOne(type => User, user => user.codes)
    winner!: User;
}
