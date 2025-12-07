import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { sequelize, connectDB } from './database/db.js';
import User from './models/User.js';

const app = express();
const PORT = 3000;

//Avem nevoie de CORS pentru a comunica cu portul 5176 de pe frontend, care e diferit de port-ul 3000 de pe backend
app.use(cors());
//Pentru a trimite mai usor json()
app.use(express.json());


//Cand se face un get pe root, afiseaza "Serverul merge :D"
app.get('/', (req, res) => {
    res.send('The server is runnning');
})

const start = async () => {
    await connectDB();

    await sequelize.sync({ alter: true });
    console.log('All models synced.');

    //Shhhhhh the server listens
    app.listen(PORT, () => console.log(`The server is running on: http://localhost:${PORT}`));
};

start();
