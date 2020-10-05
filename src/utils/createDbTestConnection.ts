import { createConnection } from "typeorm";

export const createDbTestConnection = (testConnectionName: string, entities: any[]) => {
    return createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: 'SuperSecretPassword',
        database: 'db',
        synchronize: true,
        entities: entities,
        name: testConnectionName,
        dropSchema: true,
    });
}