import { Clinic } from '../clinic/clinic.entity';
import { Women } from '../women/women.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { ConsumedMedication } from '../consumed-medication/consumed-medication.entity';

@Entity()
export class Booking {
    @PrimaryColumn()
    bookingId?: number;

    @Column()
    date: string;

    @Column()
    dateTime: string;

    @ManyToOne(type => Women)
    @JoinColumn({ name: 'womenId' })
    women?: Women;

    @ManyToOne(type => Clinic)
    @JoinColumn({ name: 'clinicId' })
    clinic?: Clinic;

    @ManyToMany(type => ConsumedMedication, consumedMedication => consumedMedication.bookings)
    consumedMedications?: ConsumedMedication[];
}
