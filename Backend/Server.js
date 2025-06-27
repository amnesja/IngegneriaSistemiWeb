import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import legendsRoutes from './routes/legend.routes.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json())

app.use('/api/legends', legendsRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    app.listen(3000, () => console.log('Server avviato su http://localhost:3000'));
}).catch((err) => console.log(err));