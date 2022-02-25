import {
  GetCommand,
  GetCommandInput,
  GetCommandOutput,
  PutCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { documentClient } from './DBClient';

export interface APIKey {
  client_id: string | undefined;
  client_secret: string | undefined;
}

interface APIKeyItem {
  key: string;
  apiKey: APIKey;
}

export default class ApiModel {
  static async createApiKey(uid: string, key: APIKey) {
    const newItem = {
      key: uid,
      apiKey: key,
    } as APIKeyItem;
    await documentClient.send(
      new PutCommand({
        TableName: 'ApiKeys',
        Item: newItem,
      }),
    );
  }

  static async getApiKey(uid: string): Promise<APIKey | boolean> {
    const cmd = new GetCommand({
      TableName: 'ApiKeys',
      Key: {
        key: uid,
      },
    } as GetCommandInput);
    const output: GetCommandOutput = await documentClient.send(cmd);
    if (output.Item === undefined) {
      return false;
    }

    return output.Item.apiKey as APIKey;
  }

  static async updateApiKey(uid: string, key: APIKey) {
    await documentClient.send(
      new UpdateCommand({
        Key: {
          key: uid,
        },
        ExpressionAttributeValues: {
          ':apiKey': key,
        },
        ExpressionAttributeNames: {
          '#apiKey': 'apiKey',
        },
        UpdateExpression: 'set #apiKey = :apiKey',
        TableName: 'ApiKeys',
      }),
    );
  }
}
