import {
  GetCommand,
  GetCommandOutput,
  PutCommand,
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { documentClient } from './DBClient';
import { Wallet } from './WalletModel';
import createToken from '../service/token/createToken';

export interface TokenInput {
  name: string;
  totalSupply: number;
  symbol: string;
  version: number;
  decimals: number;
}

export interface Token {
  address: string;
  name: string;
  totalSupply: number;
  symbol: string;
  version: string;
  decimals: number;
  created_at: string;
  serviceWallet?: string;
}

export default class TokenMode {
  static async getTokens(): Promise<Token[]> {
    const cmd = new ScanCommand({
      TableName: 'Tokens',
    } as ScanCommandInput);
    const output: ScanCommandOutput = await documentClient.send(cmd);

    return output.Items as Token[];
  }

  static async getToken(address: string): Promise<Token> {
    const cmd = new GetCommand({
      TableName: 'Tokens',
      Key: {
        address: address,
      },
    });
    const output: GetCommandOutput = await documentClient.send(cmd);

    return output.Item as Token;
  }

  static async createToken(
    token: Token,
    serviceWallet: Wallet,
  ): Promise<Token> {
    const newToken: Token = await createToken(token, serviceWallet);
    newToken.created_at = new Date().toISOString();
    await documentClient.send(
      new PutCommand({
        TableName: 'Tokens',
        Item: newToken,
      }),
    );

    return newToken;
  }
}
