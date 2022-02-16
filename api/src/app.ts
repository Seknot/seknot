import express from 'express';
import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { DefaultController } from './controllers/DefaultController';
import { WalletController } from './controllers/WalletController';
import { TokenController } from './controllers/TokenController';
import { ServiceController } from './controllers/ServiceController';
import { auth } from 'express-openid-connect';
import bodyParser from 'body-parser';
import { APIController } from './controllers/APIController';

const allowCrossDomain = function (
  req: { method: string },
  res: {
    header: (arg0: string, arg1: string) => void;
    send: (arg0: number) => void;
  },
  next: () => void,
) {
  res.header('Access-Control-Allow-Origin', 'https://www.seknot.net');
  res.header(
    'Access-Control-Allow-Methods',
    'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  );
  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }
};

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
// app.use(cors());
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(auth(config));
app.use(express.urlencoded({ extended: true }));

export default app;
