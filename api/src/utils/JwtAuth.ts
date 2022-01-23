import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

export const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-xe71ik8z.us.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://api.seknot.net',
  issuer: 'https://dev-xe71ik8z.us.auth0.com/',
  algorithms: ['RS256'],
});
