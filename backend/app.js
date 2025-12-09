import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { sequelize, connectDB } from './database/db.js';
import './models/associations.js';
import authRoutes from './routes/authRoutes.js'; 
import groupRoutes from './routes/groupRoutes.js';   

const app = express();
const PORT = 3000;

//We need CORS to communicate with our frontend server
app.use(cors());

app.use(express.json());

//We send every auth request to our auth router
app.use('/api/auth', authRoutes);

//We send every group request to our group router
app.use('/api/groups', groupRoutes);

app.get('/', (req, res) => {
    res.send('The server is runnning');
})

const start = async () => {
    await connectDB();

    await sequelize.sync({ alter: true });
    console.log('All models synced.');

    //Shhhhhh the server is listening
    app.listen(PORT, () => console.log(`The server is running on: http://localhost:${PORT}`));
};

start();
