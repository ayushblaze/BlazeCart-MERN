import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);

app.use('/api/users', userRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(process.env.PORT, console.log('Server running on port 5000 ✅'.yellow));