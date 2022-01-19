import express from 'express';
import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { DefaultController } from './controllers/DefaultController';
import { WalletController } from './controllers/WalletController';
import { TokenController } from './controllers/TokenController';
import { ServiceController } from './controllers/ServiceController';

const app = createExpressServer({
  development: process.env.NODE_ENV !== 'production' ? true : false,
  controllers: [
    DefaultController,
    WalletController,
    TokenController,
    ServiceController,
  ],
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
