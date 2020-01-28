import { createConnection } from 'typeorm';
import { User } from '../entity/user.entity';

export default async () => {

    // Connexion à MySQL en local
    await createConnection({
        type: 'mysql',
        host: process.env.LOCAL_DB_LOCALHOST,
        username: process.env.LOCAL_DB_USER,
        password: process.env.LOCAL_DB_PASSWORD,
        database: 'checkpoint4',
        entities: [
            // Ecrire tous noms des tables Entities
            User,

        ],
        synchronize: true,
    });
    };
