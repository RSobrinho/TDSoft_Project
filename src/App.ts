import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from '../swagger.json'
import { config } from 'dotenv'
import mongoose from 'mongoose'
import { join } from 'path'
import BaseRouter from './infrastructure/routes/BaseRouter'
import FinanceRouter from './infrastructure/routes/FinanceRouter'
import { errorResponse } from './model/exceptions/Handler'

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
    this.express.use(
      '/api/v1/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocs),
    );
  }

  private errorMiddlewares() {
    // this.express.use(errorLogging)
    this.express.use(errorResponse);
  }

  private routes () {
    this.express.use('/', BaseRouter)
    this.express.use('/fin', FinanceRouter)
  }

  private database() {
    mongoose.set('strictQuery', false);
    mongoose
      .connect(process.env.DATABASE_URL as string)
      .then(() => console.log('DB connection established'));
  }
}

export default new App().express;
