import { Booking } from '../booking/booking.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Women {
    @PrimaryGeneratedColumn()
    womenId: number;

    @PrimaryColumn()
    name: string;

    @PrimaryColumn()
    email: string;

    @OneToMany(type => Booking, booking => booking.women)
    bookings?: Booking[];
}
