import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import responsavelRoutes from './routes/responsavelRoutes.js'
import locationRoutes from './routes/locationRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json())


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes)
app.use('/api/resp', responsavelRoutes)
app.use('/api/location', locationRoutes)
app.use('/api/push', notificationRoutes)




app.listen(process.env.S_PORT);
console.log(`Server listening on port ${process.env.S_PORT}`)