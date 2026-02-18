import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'game-tracker-api-db',
    
    synchronize: process.env.NODE_ENV === 'development',
    logging: false,

    entities: [path.join(path.dirname(import.meta.url.replace("file://", "")), "../entities/*.{ts,js}")],
    migrations: [path.join(path.dirname(import.meta.url.replace("file://", "")), "../migrations/*.{ts,js}")],
    subscribers: [path.join(path.dirname(import.meta.url.replace("file://", "")), "../subscribers/*.{ts,js}")],
});