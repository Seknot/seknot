import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  UseAfter,
  UseBefore,
} from 'routing-controllers';
import { Wallet } from '../models/WalletModel';
import { Service, ServiceInput, ServiceModel } from '../models/ServiceModel';
import { json } from 'body-parser';
import { jwtCheck } from '../utils/JwtAuth';
import { requiredScopes } from 'express-oauth2-jwt-bearer';

@JsonController('/service')
@UseBefore(jwtCheck)
export class ServiceController {
  @Get('/')
  @UseAfter(requiredScopes('read:service'))
  getAllServices(): Promise<Service[]> {
    return ServiceModel.getServices();
  }

  @Get('/:id')
  @UseAfter(requiredScopes('read:service'))
  getService(@Param('id') id: string): Promise<Service> {
    return ServiceModel.getService(id);
  }

  @Post('/')
  @UseAfter(requiredScopes('create:service'))
  @UseBefore(json())
  createNewService(@Body() input: ServiceInput): Promise<Service> {
    return ServiceModel.createService(input);
  }

  @Delete('/:id')
  @UseAfter(requiredScopes('delete:service'))
  deleteService(@Param('id') id: string): Promise<Wallet> {
    return ServiceModel.deleteService(id);
  }
}
