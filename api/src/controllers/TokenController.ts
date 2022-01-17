import {
  BadRequestError,
  Body,
  BodyParam,
  Controller,
  Get,
  Param,
  Post,
  UseBefore,
} from 'routing-controllers';
import TokenModel from '../models/TokenModel';
import TokenMode, { Token } from '../models/TokenModel';
import WalletModel, { Wallet } from '../models/WalletModel';
import { json } from 'body-parser';

@Controller('/token')
export class TokenController {
  @Get('/')
  getAllTokens(): Promise<Token[]> {
    return TokenModel.getTokens();
  }

  @Get('/:address')
  getToken(@Param('address') address: string): Promise<Token> {
    return TokenModel.getToken(address);
    if (!address) throw new BadRequestError('address required');
  }

  @Post('/')
  @UseBefore(json())
  async createToken(
    @Body() token: Token,
    @BodyParam('serviceWallet', { required: true }) walletAddress: string,
  ): Promise<Token> {
    const serviceWallet: Wallet = await WalletModel.getWalletByAddress(
      walletAddress,
    );

    return await TokenMode.createToken(token, serviceWallet);
  }
}
