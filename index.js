const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./route/user');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', userRouter);

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
            console.log(`MongoDB connected`);
        }),
    )
    .catch((err) => console.log(err));
