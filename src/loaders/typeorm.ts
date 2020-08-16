
import { createConnection } from 'typeorm';
import { User } from '../entity/user.entity';
import { Token } from '../entity/token.entity';
require('dotenv').config();

export default async () => {

    const PORT = process.env.PORT ? +process.env.PORT : 3306;
    // Connexion à MySQL en local
    await createConnection({
        type: 'mysql',
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DBB,
        port: PORT,
        entities: [
            // Ecrire tous noms des tables Entities
            User,
            Token,
        ],
        synchronize: true,
    });
    };
