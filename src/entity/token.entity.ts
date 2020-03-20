import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('token')
export class Token {

    @PrimaryGeneratedColumn({ type: 'int' })
    id!: number;

    @Column({type : 'varchar', length: 50})
    value!: string;

    @Column()
    expiration!: Date;

    @OneToOne(type => User, {onDelete: 'CASCADE'})
    @JoinColumn()
    user!: User;

}
