import { Clinic } from '../clinic/clinic.entity';
import { Women } from '../women/women.entity';
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';

@Entity()
export class Booking {
    @PrimaryColumn()
    bookingId?: number;

    @Column()
    date: string;

    @Column()
    dateTime: string;

    @ManyToOne(type => Women, women => women.bookings)
    women: Women;

    @ManyToOne(type => Clinic, clinic => clinic.bookings)
    clinic: Clinic;
}
