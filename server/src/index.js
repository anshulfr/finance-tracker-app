import express from 'express';
import mongoose from 'mongoose';
import financialRecordRouter from './routes/financial-records.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI;

mongoose
    .connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB', err));

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});