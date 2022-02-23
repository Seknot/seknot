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
import { NotFoundError } from 'routing-controllers';

export interface Service {
  id: string;
  uid: string;
  name: string;
  serviceWallet: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceInput {
  name: string;
  uid: string;
}

export default class ServiceModel {
  static async getServices(): Promise<Service[]> {
    const cmd = new ScanCommand({
      TableName: 'Services',
    } as ScanCommandInput);
    const output: ScanCommandOutput = await documentClient.send(cmd);

    return output.Items as Service[];
  }

  static async getServicesByUID(uid: string): Promise<Service[]> {
    const cmd = new ScanCommand({
      TableName: 'Services',
      FilterExpression: 'uid = :uid',
      ExpressionAttributeValues: {
        ':uid': uid,
      },
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

  static async getServiceByAddress(serviceWallet: string): Promise<any> {
    const cmd = new ScanCommand({
      TableName: 'Services',
      FilterExpression: 'serviceWallet = :serviceWallet',
      ExpressionAttributeValues: {
        ':serviceWallet': serviceWallet,
      },
    } as ScanCommandInput);
    const output: ScanCommandOutput = await documentClient.send(cmd);

    if (output.Items == undefined || output.Items[0] == undefined) {
      throw new NotFoundError('error service not found');
    } else {
      return output.Items[0] as Service;
    }
  }

  static async createService(input: ServiceInput): Promise<Service> {
    const serviceId = randomUUID();
    const serviceWallet: Wallet = await WalletModel.createWallet(serviceId);

    const newService: Service = {
      id: randomUUID(),
      name: input.name,
      uid: input.uid,
      serviceWallet: serviceWallet.address,
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
