import { Booking } from '../booking/booking.entity';
import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, Column, JoinColumn } from 'typeorm';

@Entity()
export class ConsumedMedication {
    @PrimaryGeneratedColumn()
    consumedMedicationId?: number;

    @Column()
    name: string;

    @ManyToMany(type => Booking, booking => booking.consumedMedications)
    @JoinTable({
        name: 'booking_consumed_medication'
    })
    bookings?: Booking[];
}
