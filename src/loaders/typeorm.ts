import { createConnection } from 'typeorm';
import { DATABASE } from '../config/config';
import { Token } from '../entity/token.entity';
import { User } from '../entity/user.entity';
import { Attempt } from './../entity/attempt.entity';
import { Code } from './../entity/code.entity';

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
            Attempt,
            Code,
        ],
        synchronize: true,
    });
    };
