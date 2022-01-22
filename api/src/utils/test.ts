import WalletModel, { Wallet } from '../models/WalletModel';
import TokenModel, { Token } from '../models/TokenModel';
import { TokenService } from '../service/token/TokenService';
import { Service, ServiceModel } from '../models/ServiceModel';

(async () => {
  const wallet: Wallet = await WalletModel.getWalletByAddress(
    '0xD034E7A0470238DEb98D40D9C353B72676d0858a',
  );
  const token: Token = await TokenModel.getToken(
    '0xCf1f09c2189c0de7b504a6618809E5339E149879',
  );

  const service: Service = await ServiceModel.getService('aaa');
  const tokenController = await TokenService.init(wallet, token, service);
  // console.log(await tokenController.depositGAS(0.05));
  // console.log(await tokenController.getServiceWalletBalance());
  // console.log(await tokenController.getITXBalance());
  // await tokenController.sendToken(
  //   await WalletModel.getWalletByAddress(service.serviceWallet),
  //   10,
  // );
  // console.log(await tokenController.getBalance());
  // console.log(await tokenController.issueToken(10));
})();
