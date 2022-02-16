import {
  BodyParam,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  QueryParam,
  UseAfter,
  UseBefore,
} from 'routing-controllers';
import WalletModel, { Wallet, WalletOutput } from '../models/WalletModel';
import { json } from 'body-parser';
import { jwtCheck } from '../utils/JwtAuth';
import { requiredScopes } from 'express-oauth2-jwt-bearer';
import cors from 'cors';
@JsonController('/wallet')
@UseBefore(cors())
@UseBefore(jwtCheck)
export class WalletController {
  @Get('/')
  @UseAfter(requiredScopes('read:wallet'))
  async getAllWallets(): Promise<WalletOutput[]> {
    const wallets: Wallet[] = await WalletModel.getWallets();
    const output: WalletOutput[] = wallets.map((wallet) => {
      return {
        address: wallet.address,
        service: wallet.service,
        created_at: wallet.created_at,
      } as WalletOutput;
    });

    return output;
  }

  @Get('/:address')
  @UseAfter(requiredScopes('read:wallet'))
  getWallet(@Param('address') address: string): Promise<WalletOutput> {
    return WalletModel.getWalletByAddressOutput(address);
  }

  @Post('/')
  @UseBefore(json())
  @UseAfter(requiredScopes('create:wallet'))
  async createNewWallet(
    @BodyParam('serviceId', { required: true }) serviceId: string,
  ): Promise<WalletOutput> {
    const newWallet = await WalletModel.createWallet(serviceId);
    const outputItem: WalletOutput = {
      address: newWallet.address,
      service: newWallet.service,
      created_at: newWallet.created_at,
    };

    return outputItem;
  }

  @Delete('/')
  @UseAfter(requiredScopes('delete:wallet'))
  deleteWallet(
    @QueryParam('id', { required: true }) id: string,
  ): Promise<Wallet> {
    return WalletModel.deleteWallet(id);
  }
}
