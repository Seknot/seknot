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
import WalletModel, { Wallet } from './WalletModel';
import { randomUUID } from 'crypto';
import {
  DeleteItemCommand,
  DeleteItemCommandOutput,
} from '@aws-sdk/client-dynamodb';

export interface Service {
  id: string;
  name: string;
  serviceWallet: string;
  userWallets: string[];
  accessUsers: string[];
  created_at: string;
  updated_at: string;
}

export interface ServiceInput {
  name: string;
  uid: string;
}

export class ServiceModel {
  static async getServices(): Promise<Service[]> {
    const cmd = new ScanCommand({
      TableName: 'Services',
    } as ScanCommandInput);
    const output: ScanCommandOutput = await documentClient.send(cmd);

    return output.Items as Service[];
  }

  static async getService(id: string): Promise<Service> {
    const cmd = new GetCommand({
      TableName: 'Services',
      Key: {
        id: id,
      },
    } as GetCommandInput);
    const output: GetCommandOutput = await documentClient.send(cmd);

    return output.Item as Service;
  }

  static async createService(input: ServiceInput): Promise<Service> {
    const serviceId = randomUUID();
    const serviceWallet: Wallet = await WalletModel.createWallet(serviceId);

    const newService: Service = {
      id: randomUUID(),
      name: input.name,
      serviceWallet: serviceWallet.address,
      userWallets: [],
      accessUsers: [input.uid],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await documentClient.send(
      new PutCommand({
        TableName: 'Services',
        Item: newService,
      }),
    );

    return newService;
  }

  static async deleteService(id: string): Promise<any> {
    const output: DeleteItemCommandOutput = await documentClient.send(
      new DeleteItemCommand({
        TableName: 'Services',
        Key: {
          id: { S: id },
        },
      }),
    );

    return output.$metadata.httpStatusCode;
  }
}
