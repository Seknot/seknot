import {
  Body,
  BodyParam,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  UseAfter,
  UseBefore,
} from 'routing-controllers';
import ServiceModel, { Service, ServiceInput } from '../models/ServiceModel';
import { json } from 'body-parser';
import { requiredScopes } from 'express-oauth2-jwt-bearer';
import { GasService } from '../service/token/TokenService';
import { ethers } from 'ethers';

@JsonController('/service')
export class ServiceController {
  @Get('/')
  @UseAfter(requiredScopes('read:service'))
  async getAllServices(): Promise<Service[]> {
    return ServiceModel.getServices();
  }

  @Get('/:id')
  @UseAfter(requiredScopes('read:service'))
  async getService(@Param('id') id: string): Promise<Service> {
    return ServiceModel.getService(id);
  }

  @Post('/')
  @UseBefore(json())
  @UseAfter(requiredScopes('create:service'))
  async createNewService(@Body() input: ServiceInput): Promise<Service> {
    return ServiceModel.createService(input);
  }

  @Delete('/:id')
  @UseAfter(requiredScopes('delete:service'))
  async deleteService(@Param('id') id: string): Promise<any> {
    return ServiceModel.deleteService(id);
  }

  @Get('/:id/deposit')
  @UseAfter(requiredScopes('read:service'))
  async getITXBalance(@Param('id') id: string): Promise<number> {
    const service: Service = await ServiceModel.getService(id);
    const gasService = await GasService.init(service);

    return gasService.getITXBalance();
  }

  @Get('/:id/balance')
  @UseAfter(requiredScopes('read:service'))
  async getServiceWalletBalance(@Param('id') id: string): Promise<string> {
    const service: Service = await ServiceModel.getService(id);
    const gasService = await GasService.init(service);

    return ethers.utils.formatEther(await gasService.getServiceWalletBalance());
  }

  @Post('/:id/deposit')
  async depositGas(
    @Param('id') id: string,
    @BodyParam('value') value: number,
  ): Promise<any> {
    const service: Service = await ServiceModel.getService(id);
    const gasService = await GasService.init(service);

    return gasService.depositGAS(value);
  }
}
