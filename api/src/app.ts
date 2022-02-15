import express from 'express';
import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { DefaultController } from './controllers/DefaultController';
import { WalletController } from './controllers/WalletController';
import { TokenController } from './controllers/TokenController';
import { ServiceController } from './controllers/ServiceController';
import { auth } from 'express-openid-connect';
import session from 'cookie-session';
import bodyParser from 'body-parser';
import { APIController } from './controllers/APIController';
import cors from 'cors';

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL:
    process.env.NODE_ENV == 'prod'
      ? 'https://api.seknot.net'
      : 'http://localhost:3000',
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

const app = createExpressServer({
  development: process.env.NODE_ENV !== 'prod' ? true : false,
  controllers: [
    ServiceController,
    DefaultController,
    WalletController,
    TokenController,
    APIController,
  ],
});

// Middleware
app.use(bodyParser.json());
app.use(auth(config));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    name: 'identity102-l01-e01',
    secret: process.env.COOKIE_SECRET,
  }),
);
app.options('*', cors());

export default app;
