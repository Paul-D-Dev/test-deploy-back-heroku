import { createConnection } from 'typeorm';

export default async () => {

    // Connexion à MySQL en local
    await createConnection({
        type: 'mysql',
        host: process.env.LOCAL_DB_LOCALHOST,
        username: process.env.LOCAL_DB_USER,
        password: process.env.LOCAL_DB_PASSWORD,
        database: 'node',
        entities: [
            // Ecrire tous noms des tables Entities

        ],
        synchronize: false,
    });
    };
