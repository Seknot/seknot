/*
    AWS DynamoDB Instance
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const dbClient = new DynamoDBClient(
  process.env.NODE_ENV == 'dev'
    ? {
        endpoint: 'http://localhost:8000',
      }
    : {},
);
console.log(process.env.NODE_ENV);
const documentClient = DynamoDBDocumentClient.from(dbClient);
export { documentClient, dbClient };
