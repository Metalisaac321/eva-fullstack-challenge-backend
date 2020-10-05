import { Booking } from '../booking/booking.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Women {
    @PrimaryGeneratedColumn()
    womenId: number;

    @Column()
    name: string;

    @Column()
    email: string;
}
