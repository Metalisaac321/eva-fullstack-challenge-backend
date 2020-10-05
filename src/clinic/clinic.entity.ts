import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Clinic {
    @PrimaryGeneratedColumn()
    clinicId?: number;

    @Column()
    name: string;
}
