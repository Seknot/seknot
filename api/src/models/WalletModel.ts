import {
  GetCommand,
  GetCommandInput,
  GetCommandOutput,
  PutCommand,
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { documentClient } from './DBClient';
import { randomUUID } from 'crypto';
import {
  DeleteItemCommand,
  DeleteItemCommandOutput,
} from '@aws-sdk/client-dynamodb';
import { issueWallet } from '../service/wallet/issueWallet';
import { ethers } from 'ethers';

export interface Wallet {
  id: string;
  address: string;
  service: string;
  privateKey: string;
  publicKey: string;
  created_at: string;
}

export interface WalletOutput {
  id: string;
  address: string;
  service: string;
  created_at: string;
}

export default class WalletModel {
  static async getWallets(): Promise<Wallet[]> {
    const cmd = new ScanCommand({
      TableName: 'Wallets',
    } as ScanCommandInput);
    const output: ScanCommandOutput = await documentClient.send(cmd);

    return output.Items as Wallet[];
  }

  static async createWallet(serviceId: string): Promise<Wallet> {
    const wallet: ethers.Wallet = await issueWallet();
    const newWallet = {
      id: randomUUID(),
      address: wallet.address,
      service: serviceId,
      privateKey: wallet.privateKey,
      publicKey: wallet.publicKey,
      created_at: new Date().toISOString(),
    };

    await documentClient.send(
      new PutCommand({
        TableName: 'Wallets',
        Item: newWallet,
      }),
    );

    return newWallet;
  }

  static async deleteWallet(id: string): Promise<any> {
    const output: DeleteItemCommandOutput = await documentClient.send(
      new DeleteItemCommand({
        TableName: 'Wallets',
        Key: {
          id: { S: id },
        },
      }),
    );

    return output.$metadata.httpStatusCode;
  }

  static async getWalletByAddress(address: string): Promise<WalletOutput> {
    const cmd = new ScanCommand({
      TableName: 'Wallets',
      FilterExpression: 'address = :address',
      ExpressionAttributeValues: {
        ':address': address,
      },
    } as ScanCommandInput);
    const output: ScanCommandOutput = await documentClient.send(cmd);
    if (output.Items === undefined) {
      throw new Error('Wallet not found');
    }

    const outputItem: WalletOutput = {
      id: output.Items[0].id,
      address: output.Items[0].address,
      service: output.Items[0].service,
      created_at: output.Items[0].created_at,
    };

    return outputItem;
  }

  static async getWalletById(id?: string): Promise<WalletOutput> {
    const cmd = new GetCommand({
      TableName: 'Wallets',
      Key: {
        id: id,
      },
    } as GetCommandInput);
    const output: GetCommandOutput = await documentClient.send(cmd);
    if (output.Item === undefined) {
      throw new Error('Wallet not found');
    }
    const outputItem: WalletOutput = {
      id: output.Item.id,
      address: output.Item.address,
      service: output.Item.service,
      created_at: output.Item.created_at,
    };

    return outputItem;
  }
}
