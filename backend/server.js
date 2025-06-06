import express from 'express';
import { connectDB } from './config/db.js';
import ServiceProvider from './models/serviceProvider.model.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import serviceProvidersRoutes from './routes/serviceProvidersRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

app.use(express.json());

app.use(cors());

app.use('/api/serviceProviders', serviceProvidersRoutes);

app.use('/api/serviceProviders', uploadRoutes);
app.use('/uploads', express.static('uploads'));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get(/(.*)/, (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
    console.log('this is a message from the server');
});