import {
  BadRequestError,
  Body,
  BodyParam,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  QueryParam,
  UseBefore,
} from 'routing-controllers';
import WalletModel, { Wallet, WalletOutput } from '../models/WalletModel';
import { json } from 'body-parser';
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';

const checkJwt = auth({
  audience: 'https://api.seknot.net',
  issuerBaseURL: 'https://dev-xe71ik8z.us.auth0.com/',
});

@JsonController('/wallet')
@UseBefore(checkJwt)
@UseBefore(requiredScopes('read:wallet'))
export class WalletController {
  @Get('/')
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
  getWallet(@Param('address') address: string): Promise<WalletOutput> {
    return WalletModel.getWalletByAddressOutput(address);
  }

  @Post('/')
  @UseBefore(json())
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
  deleteWallet(
    @QueryParam('id', { required: true }) id: string,
  ): Promise<Wallet> {
    return WalletModel.deleteWallet(id);
  }
}
