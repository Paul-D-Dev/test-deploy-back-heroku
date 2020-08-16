import dotenv from 'dotenv';

dotenv.config();

export const DATABASE = {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBB,
    port: Number(process.env.DB_PORT),
};

export const JWT_SECRET = process.env.JWT_SECRET;
