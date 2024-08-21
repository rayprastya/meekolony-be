import express from 'express';
import collectionController from './controller/User';
import userController from './controller/Collection';
import tokenController from './controller/Token';
import sequelize from './infrastructure/postgres';
import { startScheduler } from './helper/scheduler';
import { wss } from './helper/websocketServer';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


const corsOptions = {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};

console.log(PORT)

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', [userController, collectionController, tokenController]);

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            startScheduler();
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
