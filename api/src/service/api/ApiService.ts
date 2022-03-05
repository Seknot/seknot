const request = require('request-promise');
const axios = require('axios');
import { APIKey } from '../../models/ApiModel';

export class ApiService {
  constructor(clientId: string | undefined, clientSecret: string | undefined) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  clientId!: string | undefined;
  clientSecret!: string | undefined;
  accessToken!: string;

  async getAccessToken() {
    const params = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      audience: process.env.AUTH0_MANEGE_AUDIENCE,
      grant_type: 'client_credentials',
    };
    const options = {
      method: 'POST',
      url: 'https://dev-xe71ik8z.us.auth0.com/oauth/token',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(params),
    };
    const output = JSON.parse(await request(options));
    return output.access_token;
  }

  async setAccessToken() {
    this.accessToken = await this.getAccessToken();
  }

  async issueApiKey(uid: string) {
    const params = {
      name: 'SeknotKey-' + uid,
      app_type: 'non_interactive',
    };
    const options = {
      method: 'POST',
      url: process.env.AUTH0_MANEGE_AUDIENCE + 'clients',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + this.accessToken,
      },
      body: JSON.stringify(params),
    };
    const output = JSON.parse(await request(options));
    const apiKey = {
      client_id: output.client_id,
      client_secret: output.client_secret,
    } as APIKey;

    await request({
      method: 'POST',
      url: process.env.AUTH0_MANEGE_AUDIENCE + 'client-grans',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + this.accessToken,
      },
      body: JSON.stringify({
        client_id: apiKey.client_id,
        audience: 'https://api.seknot.net',
        scope: [
          'read:wallet create:wallet transfer:token issue:token delete:wallet read:service',
        ],
      }),
    });

    return apiKey;
  }

  async rotateApiKey(client_id: string) {
    const options = {
      method: 'POST',
      url:
        process.env.AUTH0_MANEGE_AUDIENCE +
        `clients/${client_id}/rotate-secret`,
      headers: {
        authorization: 'Bearer ' + this.accessToken,
      },
    };
    const output = JSON.parse(await request(options));
    return {
      client_id: output.client_id,
      client_secret: output.client_secret,
    } as APIKey;
  }
}
