import {
  Body,
  Delete,
  Get,
  JsonController,
  Post,
  QueryParam,
} from 'routing-controllers';
import WalletModel, { Wallet, WalletOutput } from '../models/WalletModel';

@JsonController('/wallet')
export class WalletController {
  @Get('/all')
  getAllWallets(): Promise<Wallet[]> {
    return WalletModel.getWallets();
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

  @Get('/')
  getWallet(
    @QueryParam('id') id: string,
    @QueryParam('address') address: string,
  ): Promise<WalletOutput> {
    if (id !== undefined) {
      return WalletModel.getWalletById(id);
    } else if (address !== undefined)
      return WalletModel.getWalletByAddress(address);
    else throw new Error('id or address required');
  }
}
