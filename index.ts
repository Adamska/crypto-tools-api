import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import errorHandler from './src/utils/middlewares/error.handler';

const app = express();
const port = process.env.PORT || 5000;
const dbURI = process.env.DB_URI || '';

console.log(dbURI);
app.use(cors());
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Welcome to Crypto-tools.' });
});

app.use(errorHandler);

mongoose
  .connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDb database');
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
