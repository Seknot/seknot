import {
  BadRequestError,
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  QueryParam,
} from 'routing-controllers';
import WalletModel, { Wallet, WalletOutput } from '../models/WalletModel';

@JsonController('/wallet')
export class WalletController {
  @Get('/')
  getAllWallets(): Promise<Wallet[]> {
    return WalletModel.getWallets();
  }

  @Get('/:address')
  getWallet(@Param('address') address: string): Promise<WalletOutput> {
    return WalletModel.getWalletByAddressOutput(address);
    if (!address) throw new BadRequestError('address required');
  }

  @Post('/')
  createNewWallet(@Body() shopId: string): Promise<Wallet> {
    return WalletModel.createWallet(shopId);
  }

  @Delete('/')
  deleteWallet(
    @QueryParam('id', { required: true }) id: string,
  ): Promise<Wallet> {
    return WalletModel.deleteWallet(id);
  }
}
