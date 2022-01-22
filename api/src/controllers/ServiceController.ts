import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  UseBefore,
} from 'routing-controllers';
import { Wallet } from '../models/WalletModel';
import { Service, ServiceInput, ServiceModel } from '../models/ServiceModel';
import { json } from 'body-parser';
import { requiresAuth } from 'express-openid-connect';

@JsonController('/service')
@UseBefore(requiresAuth())
export class ServiceController {
  @Get('/')
  getAllWallets(): Promise<Service[]> {
    return ServiceModel.getServices();
  }

  @Get('/:id')
  getWallet(@Param('id') id: string): Promise<Service> {
    return ServiceModel.getService(id);
  }

  @Post('/')
  @UseBefore(json())
  createNewWallet(@Body() input: ServiceInput): Promise<Service> {
    return ServiceModel.createService(input);
  }

  @Delete('/:id')
  deleteWallet(@Param('id') id: string): Promise<Wallet> {
    return ServiceModel.deleteService(id);
  }
}
