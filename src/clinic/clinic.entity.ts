import { Booking } from '../booking/booking.entity';
import { Entity, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Clinic {
    @PrimaryGeneratedColumn()
    clinicId?: number;

    @PrimaryColumn()
    name: string;

    @OneToMany(type => Booking, booking => booking.clinic)
    bookings?: Booking[];
}
