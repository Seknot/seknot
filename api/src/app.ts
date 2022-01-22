import express from 'express';
import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { DefaultController } from './controllers/DefaultController';
import { WalletController } from './controllers/WalletController';
import { TokenController } from './controllers/TokenController';
import { ServiceController } from './controllers/ServiceController';
import { auth } from 'express-openid-connect';

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: '86ea16dbdcdd905949fd8f9dd7630902df051b27c4450c233ce938e0ab9c9c73',
  baseURL: 'http://localhost:3000',
  clientID: 'XDONVPzikQnVNgNkVu6aoBPfN5t4itt2',
  issuerBaseURL: 'https://dev-xe71ik8z.us.auth0.com',
};

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
app.use(auth(config));
app.use(express.urlencoded({ extended: true }));

export default app;
