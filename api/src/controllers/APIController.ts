import {
  Get,
  JsonController,
  NotFoundError,
  Param,
  UseAfter,
  UseBefore,
} from 'routing-controllers';
import { requiredScopes } from 'express-oauth2-jwt-bearer';
import cors from 'cors';
import ApiModel, { APIKey } from '../models/ApiModel';
import { ApiService } from '../service/api/ApiService';
import { jwtCheck } from '../utils/JwtAuth';

@JsonController('/user')
@UseBefore(cors())
@UseBefore(jwtCheck)
export class APIController {
  api = new ApiService(
    process.env.AUTH0_MANEGE_ID,
    process.env.AUTH0_MANEGE_SECRET,
  );

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

  @Get('/:uid/get')
  @UseAfter(requiredScopes('read:api-key'))
  async getAPIKey(@Param('uid') uid: string): Promise<APIKey> {
    const key: APIKey | boolean = await ApiModel.getApiKey(uid);
    if (key === false) {
      // Create New Api Key
      await this.api.setAccessToken();
      const issuedKey = await this.api.issueApiKey(uid);
      await ApiModel.createApiKey(uid, issuedKey);
      return issuedKey;
    } else {
      return key as APIKey;
    }
  }

  @Get('/:uid/rotate')
  @UseAfter(requiredScopes('read:api-key'))
  async rotateAPIKey(@Param('uid') uid: string) {
    const key: APIKey | boolean = await ApiModel.getApiKey(uid);
    if (key === false) {
      throw new NotFoundError('UID not found');
    } else {
      const apiKey = key as APIKey;
      if (apiKey.client_id == null) {
        throw new NotFoundError('Error');
      }
      await this.api.setAccessToken();
      const newKey = await this.api.rotateApiKey(apiKey.client_id);
      await ApiModel.updateApiKey(uid, newKey);
      return newKey;
    }
  }
}
