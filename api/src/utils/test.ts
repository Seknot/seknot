import WalletModel, { Wallet } from '../models/WalletModel';
import TokenModel, { Token } from '../models/TokenModel';
import { TokenService } from '../service/token/TokenService';
import ServiceModel, { Service } from '../models/ServiceModel';

(async () => {
  const wallet: Wallet = await WalletModel.getWalletByAddress(
    '0xb8dbd6CFa7094eC4a54074Cd237213Ef364C177F',
  );
  const token: Token = await TokenModel.getToken(
    '0xCa23517A8A66a2ff572C13C60A9B11134570E412',
  );

  const service: Service = await ServiceModel.getService(
    '5c9d8c8e-639e-4ac2-877a-f688478f9e70',
  );
  const tokenController = await TokenService.init(wallet, token, service);

  // console.log(await tokenController.depositGAS(0.01));
  // console.log(await tokenController.getServiceWalletBalance());
  // console.log(await tokenController.getITXBalance());
  // await tokenController.sendToken(
  //   await WalletModel.getWalletByAddress(service.serviceWallet),
  //   10,
  // );
  console.log(await tokenController.getBalance());
  // console.log(await tokenController.issueToken(10));
})();
