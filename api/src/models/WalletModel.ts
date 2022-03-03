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
import {
  DeleteItemCommand,
  DeleteItemCommandOutput,
} from '@aws-sdk/client-dynamodb';
import { issueWallet } from '../service/wallet/issueWallet';
import { ethers } from 'ethers';

export interface Wallet {
  address: string;
  service: string;
  privateKey: string;
  publicKey: string;
  created_at: string;
}

export interface WalletOutput {
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

  static async getWalletsByServiceId(serviceId: string): Promise<Wallet[]> {
    const cmd = new ScanCommand({
      TableName: 'Wallets',
      FilterExpression: 'service = :service',
      ExpressionAttributeValues: {
        ':service': serviceId,
      },
    } as ScanCommandInput);
    const output: ScanCommandOutput = await documentClient.send(cmd);

    return output.Items as Wallet[];
  }

  static async createWallet(serviceId: string): Promise<Wallet> {
    const wallet: ethers.Wallet = await issueWallet();
    const newWallet = {
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

  static async deleteWallet(address: string): Promise<any> {
    const output: DeleteItemCommandOutput = await documentClient.send(
      new DeleteItemCommand({
        TableName: 'Wallets',
        Key: {
          address: { S: address },
        },
      }),
    );

    return output.$metadata.httpStatusCode;
  }

  // static async getWalletByAddress(address: string): Promise<WalletOutput> {
  //   const cmd = new ScanCommand({
  //     TableName: 'Wallets',
  //     FilterExpression: 'address = :address',
  //     ExpressionAttributeValues: {
  //       ':address': address,
  //     },
  //   } as ScanCommandInput);
  //   const output: ScanCommandOutput = await documentClient.send(cmd);
  //   if (output.Items === undefined) {
  //     throw new Error('Wallet not found');
  //   }
  //
  //   const outputItem: WalletOutput = {
  //     id: output.Items[0].id,
  //     address: output.Items[0].address,
  //     service: output.Items[0].service,
  //     created_at: output.Items[0].created_at,
  //   };
  //
  //   return outputItem;
  // }

  static async getWalletByAddressOutput(
    address: string,
  ): Promise<WalletOutput> {
    const cmd = new GetCommand({
      TableName: 'Wallets',
      Key: {
        address: address,
      },
    } as GetCommandInput);
    const output: GetCommandOutput = await documentClient.send(cmd);
    if (output.Item === undefined) {
      throw new Error('Wallet not found');
    }
    const outputItem: WalletOutput = {
      address: output.Item.address,
      service: output.Item.service,
      created_at: output.Item.created_at,
    };

    return outputItem;
  }

  static async getWalletByAddress(address: string): Promise<Wallet> {
    const cmd = new GetCommand({
      TableName: 'Wallets',
      Key: {
        address: address,
      },
    } as GetCommandInput);
    const output: GetCommandOutput = await documentClient.send(cmd);
    if (output.Item === undefined) {
      throw new Error('Wallet not found');
    }

    return output.Item as Wallet;
  }
}
