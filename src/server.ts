import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import authRouter from './api/controllers/auth/router';
import errorHandler from './utils/middlewares/error.handler';

const app = express();
const port = process.env.PORT || 5000;
const dbURI = process.env.DB_URI || '';

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Welcome to Crypto-tools.' });
});

app.use(errorHandler);
app.use('/auth', authRouter);

app.use(compression);

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any);

const db = mongoose.connection;
db.on('error', (err) => console.log({ err }, 'db connection error'));
db.once('open', () => {
  console.log('Connected to MongoDb database');
  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });
});
