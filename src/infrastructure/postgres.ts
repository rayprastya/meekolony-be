// src/infrastructure/dbConnection.ts
import { Sequelize } from 'sequelize';
import dbConfig from '../config/postgres';
import * as dotenv from 'dotenv';

dotenv.config();


const dialectType = (dialect: string) => {
    switch (dialect) {
        case "mssql":
            return "mssql";
        default:
            return "postgres";
    }
}
switch(process.env.DB_TYPE) {

}
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dialectType(dbConfig.dialect),
});

export default sequelize;
