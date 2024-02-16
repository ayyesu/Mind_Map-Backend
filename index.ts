import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './route/user';
import bookRouter from './route/book';
import uploadRouter from './route/upload';
import sendRequest from './route/message';
import waitlistRouter from './route/waitlist';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/books', bookRouter);
app.use('/api', uploadRouter);
app.use('/send-request', sendRequest);
app.use('/api', waitlistRouter);

const PORT: number = parseInt(process.env.PORT || '5000', 10);

mongoose
    .connect(process.env.MONGO_URI || '', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as mongoose.ConnectOptions)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
            console.log(`MongoDB connected`);
        });
    })
    .catch((err: Error) => console.log(err));
