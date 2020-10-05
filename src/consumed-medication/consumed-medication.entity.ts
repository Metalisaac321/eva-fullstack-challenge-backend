import { Booking } from '../booking/booking.entity';
import { Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class ConsumedMedication {
    @PrimaryGeneratedColumn()
    consumedMedicationId?: number;

    @PrimaryColumn()
    name: string;

    @ManyToMany(type => Booking, booking => booking.consumedMedications)
    @JoinTable()
    bookings?: Booking[];
}
