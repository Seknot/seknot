import WalletModel, { Wallet } from '../models/WalletModel';
import TokenModel, { Token } from '../models/TokenModel';
import { TokenService } from '../service/token/TokenService';

(async () => {
  const wallet: Wallet = await WalletModel.getWalletByAddress(
    '0xD034E7A0470238DEb98D40D9C353B72676d0858a',
  );
  const token: Token = await TokenModel.getToken(
    '0xfEa5dFa1551D5a2A60FD6AddEa58a663d2F07c84',
  );
  const tokenController = new TokenService(wallet, token);
  console.log(await tokenController.getBalance());
})();
