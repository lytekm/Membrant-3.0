import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import apiRouter from './routes';

dotenv.config();
const app = express();

// 1) Enable CORS
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// 2) Built-in middleware
app.use(express.json());

// 3) Log incoming API requests
app.use('/api', (req, res, next) => {
  console.log(`➡️ ${req.method} ${req.originalUrl}`);
  next();
});

// 4) Connect DB & setup routes
connectDB();
app.use('/api', apiRouter);

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`🚀 Server running on http://localhost:${port}`)
);
