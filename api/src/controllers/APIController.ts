import { Get, JsonController, UseAfter, UseBefore } from 'routing-controllers';
import { requiredScopes } from 'express-oauth2-jwt-bearer';
import { jwtCheck } from '../utils/JwtAuth';

interface APIKey {
  client_id: string | undefined;
  client_secret: string | undefined;
}

@JsonController('/user')
@UseBefore(jwtCheck)
export class APIController {
  @Get('/get-api-key')
  @UseAfter(requiredScopes('read:api-key'))
  getStatus(): APIKey {
    // Betaテスト用 API Keyを返す

    const apiKey: APIKey = {
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
    };

    return apiKey;
  }
}
