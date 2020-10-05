import { Booking } from "../booking/booking.entity";
import { Clinic } from "../clinic/clinic.entity";
import { Women } from "../women/women.entity";
import { createConnection } from "typeorm";

export const createDbTestConnection = (testConnectionName: string) => {
    return createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: 'SuperSecretPassword',
        database: 'db',
        synchronize: true,
        entities: [Women, Booking, Clinic],
        name: testConnectionName,
        dropSchema: true,
    });
}