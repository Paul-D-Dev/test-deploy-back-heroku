
import { createConnection } from 'typeorm';
import { User } from '../entity/user.entity';
import { Token } from '../entity/token.entity';
import { DATABASE } from '../config/config';

export default async () => {

    // Connexion à MySQL en local
    await createConnection({
        type: 'mysql',
        host: DATABASE.host,
        username: DATABASE.username,
        password: DATABASE.password,
        database: DATABASE.database,
        port: DATABASE.port,
        entities: [
            // Ecrire tous noms des tables Entities
            User,
            Token,
        ],
        synchronize: true,
    });
    };
