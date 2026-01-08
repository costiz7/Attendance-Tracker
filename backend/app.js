import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { sequelize, connectDB } from './database/db.js';
import './models/associations.js';
import authRoutes from './routes/authRoutes.js'; 
import groupRoutes from './routes/groupRoutes.js';   
import eventRoutes from './routes/eventRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

//We need CORS to communicate with our frontend server
app.use(cors());

app.use(express.json());

//We send every auth request to our auth router
app.use('/api/auth', authRoutes);

//We send every group request to our group router
app.use('/api/groups', groupRoutes);

//We send every event request to our event router
app.use('/api/events', eventRoutes);

//We send every attendance request to our attendance router
app.use('/api/attendances', attendanceRoutes);

const start = async () => {
    await connectDB();

    await sequelize.sync({ alter: true });
    console.log('All models synced.');

    //Shhhhhh the server is listening
    app.listen(PORT, () => console.log(`The server is running on: http://localhost:${PORT}`));
};

start();
