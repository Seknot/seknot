import WalletModel, { Wallet } from '../models/WalletModel';
import TokenModel, { Token } from '../models/TokenModel';
import { TokenService } from '../service/token/TokenService';
import { Service, ServiceModel } from '../models/ServiceModel';

(async () => {
  const wallet: Wallet = await WalletModel.getWalletByAddress(
    '0xD034E7A0470238DEb98D40D9C353B72676d0858a',
  );
  const token: Token = await TokenModel.getToken(
    '0xfde77337D08e2b04Dab7B161B650E16065e30779',
  );

  const service: Service = await ServiceModel.getService(
    '8bf56a7e-1b2e-4bbe-b271-e39d7d07acfb',
  );
  const tokenController = await TokenService.init(wallet, token, service);
  // console.log(await tokenController.depositGAS(1.0));
  // console.log(await tokenController.getITXBalance());
  // await tokenController.sendToken(
  //   await WalletModel.getWalletByAddress(service.serviceWallet),
  //   10,
  // );
  // console.log(await tokenController.getBalance());
  console.log(await tokenController.issueToken(10));
})();
