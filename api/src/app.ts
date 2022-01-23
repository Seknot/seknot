import express from 'express';
import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { DefaultController } from './controllers/DefaultController';
import { WalletController } from './controllers/WalletController';
import { TokenController } from './controllers/TokenController';
import { ServiceController } from './controllers/ServiceController';
import { auth } from 'express-openid-connect';
import session from 'cookie-session';

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: 'http://localhost:3000',
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
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
app.use(
  session({
    name: 'identity102-l01-e01',
    secret: process.env.COOKIE_SECRET,
  }),
);
app.get(
  '/',
  (
    req: { oidc: { isAuthenticated: () => any } },
    res: { send: (arg0: string) => void },
  ) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  },
);

export default app;
