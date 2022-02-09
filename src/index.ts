import express, { json, Response, Request, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { userRouter } from './routes/user.route';
import { postRouter } from './routes/post.route';

dotenv.config();
const app = express();

const port = 3001;
const uri = process.env.DB_CONNECTION_URL;

app.use(json());

let myLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log('LOGGED SOME THING');
  next();
};

app.use(myLogger);

app.use(userRouter);
app.use(postRouter);

let errorHandler = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    message: new Error('requested url not found').message,
  });

  next();
};

app.use(errorHandler);

mongoose.connect(uri as string, () => {
  console.log('connected !!!!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

function registerMiddlewares() {
  // let myLogger = (req: Request, res: Response, next: NextFunction) => {
  //   console.log('LOGGED SOME THING');
  //   next();
  // };
  //
  // let errorHandler = (req: Request, res: Response, next: NextFunction) => {
  //   return res.status(404).json({
  //     message: new Error('requested url not found').message,
  //   });
  //
  //   next();
  // };
  //
  // app.use(myLogger);
  // app.use(errorHandler);
}
