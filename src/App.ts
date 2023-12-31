import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import { join } from 'path';
import BaseRouter from './infrastructure/routes/BaseRouter';
import TransactionRouter from './infrastructure/routes/TransactionRouter';
import { errorResponse } from './model/exceptions/handler';
import SwaggerRouter from './infrastructure/routes/SwaggerRouter';
import AuthRouter from './infrastructure/routes/AuthRouter';

class App {
  public express: express.Application;

  public constructor() {
    config();

    this.express = express();
    this.middlewares();
    this.database();
    this.routes();
    this.errorMiddlewares();
  }

  private middlewares() {
    this.express.use(express.json());
    this.express.use(express.static(join(__dirname, 'public')));
  }

  private errorMiddlewares() {
    // this.express.use(errorLogging)
    this.express.use(errorResponse);
  }

  private routes() {
    this.express.use('/', SwaggerRouter);
    this.express.use('/', BaseRouter);
    this.express.use('/', AuthRouter);
    this.express.use('/fin', TransactionRouter);
  }

  // eslint-disable-next-line class-methods-use-this
  private database() {
    mongoose.set('strictQuery', false);
    mongoose
      .connect(process.env.DATABASE_URL as string)
      .then(() => console.log('DB connection established'));
  }
}

export default new App().express;
