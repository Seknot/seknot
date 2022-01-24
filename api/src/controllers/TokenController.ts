import {
  BadRequestError,
  Body,
  BodyParam,
  Controller,
  Get,
  NotFoundError,
  Param,
  Post,
  UseAfter,
  UseBefore,
} from 'routing-controllers';
import TokenModel, { Token } from '../models/TokenModel';
import WalletModel, { Wallet } from '../models/WalletModel';
import { json } from 'body-parser';
import ServiceModel, { Service } from '../models/ServiceModel';
import { TokenService } from '../service/token/TokenService';
import { requiredScopes } from 'express-oauth2-jwt-bearer';
import { jwtCheck } from '../utils/JwtAuth';

interface MintAddressInput {
  toAddress: string;
  value: number;
}

@Controller('/token')
@UseBefore(jwtCheck)
export class TokenController {
  @Get('/')
  @UseAfter(requiredScopes('read:token'))
  getAllTokens(): Promise<Token[]> {
    return TokenModel.getTokens();
  }

  @Get('/:address')
  @UseAfter(requiredScopes('read:token'))
  getToken(@Param('address') address: string): Promise<Token> {
    return TokenModel.getToken(address);
  }

  @Get('/:address/:walletAddress/balance')
  async getBalance(
    @Param('address') address: string,
    @Param('walletAddress') walletAddress: string,
  ): Promise<string> {
    const wallet: Wallet = await WalletModel.getWalletByAddress(walletAddress);
    const token: Token = await TokenModel.getToken(address);
    if (token.serviceWallet == null) throw new NotFoundError('Token No Found');
    const service: Service = await ServiceModel.getServiceByAddress(
      token.serviceWallet,
    );
    const tokenController = await TokenService.init(wallet, token, service);
    const balance = await tokenController.getBalance();

    return balance.toString();
  }

  @Post('/')
  @UseBefore(json())
  @UseAfter(requiredScopes('create:token'))
  async createToken(
    @Body() token: Token,
    @BodyParam('serviceWallet', { required: true }) walletAddress: string,
  ): Promise<Token> {
    const serviceWallet: Wallet = await WalletModel.getWalletByAddress(
      walletAddress,
    );
    console.log(token);

    return await TokenModel.createToken(token, serviceWallet);
  }

  @Post('/:address/mint')
  @UseAfter(requiredScopes('issue:token'))
  @UseBefore(json())
  async issueToken(
    @Param('address') tokenAddress: string,
    @Body() input: MintAddressInput,
  ): Promise<string> {
    const wallet: Wallet = await WalletModel.getWalletByAddress(
      input.toAddress,
    );
    const token: Token = await TokenModel.getToken(tokenAddress);
    console.log(token);
    if (token.serviceWallet == null) throw new NotFoundError('token not found');
    const service: Service = await ServiceModel.getServiceByAddress(
      token.serviceWallet,
    );

    const tokenController = await TokenService.init(wallet, token, service);
    const hash = await tokenController.issueToken(input.value);

    return hash;
  }

  @Post('/:address/transfer')
  @UseAfter(requiredScopes('transfer:token'))
  @UseBefore(json())
  async sendToken(
    @Param('address') tokenAddress: string,
    @BodyParam('fromAddress') fromAddress: string,
    @BodyParam('toAddress') toAddress: string,
    @BodyParam('value') value: number,
  ): Promise<string> {
    const wallet: Wallet = await WalletModel.getWalletByAddress(fromAddress);
    const token: Token = await TokenModel.getToken(tokenAddress);
    if (token.serviceWallet == null) throw new NotFoundError('Token No Found');
    const service: Service = await ServiceModel.getServiceByAddress(
      token.serviceWallet,
    );
    const tokenController = await TokenService.init(wallet, token, service);

    return await tokenController.sendToken(
      await WalletModel.getWalletByAddress(toAddress),
      value,
    );
  }
}
