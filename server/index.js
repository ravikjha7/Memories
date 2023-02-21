import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './database.js';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Listening on Port ${port}`);
});