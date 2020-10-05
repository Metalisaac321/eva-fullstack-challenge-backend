import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Women {
    @PrimaryColumn()
    womenId: number;

    @Column()
    name: string;

    @Column()
    email: string;
}
