import * as dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    database: process.env.DB_NAME ?? '',
    username: process.env.DB_USERNAME ?? '',
    password: process.env.DB_PASSWORD ?? '',
    host: process.env.DB_HOST ?? '',
    dialect: process.env.DB_TYPE ?? '',
};

console.log(dbConfig)

export default dbConfig;
