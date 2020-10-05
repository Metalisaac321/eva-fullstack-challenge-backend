import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Clinic {
    @PrimaryGeneratedColumn()
    clinicId?: number;

    @Column()
    name: string;
}
