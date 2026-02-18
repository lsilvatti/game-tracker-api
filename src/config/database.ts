import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Configuração da instância do Sequelize
// Ajuste o 'dialect' para postgres, mysql, sqlite, etc.
export const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USERNAME as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

export const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log(`🔥 Database (${process.env.DB_NAME} at ${process.env.DB_HOST}:${process.env.DB_PORT}) connected via Sequelize!`);

    } catch (error) {
        console.error("❌ Unable to connect to the database:", error);
        throw error;
    }
};