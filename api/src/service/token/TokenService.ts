import { Contract, ethers } from 'ethers';
import { Wallet } from '../../models/WalletModel';
import { Token } from '../../models/TokenModel';

const ABI = require('../../assets/token/build/Token.json').abi;

export class TokenService {
  contract!: ethers.Contract;
  wallet!: ethers.Wallet;
  token: Token;
  NODE_URL = process.env.NODE_URL;

  constructor(wallet: Wallet, token: Token) {
    this.token = token;
    console.log(process.env.INFURA_PROJECT_ID);
    const provider = new ethers.providers.InfuraProvider('maticmum', {
      projectId: process.env.INFURA_PROJECT_ID,
      projectSecret: process.env.INFURA_PROJECT_SECRET,
    });
    const privateKey = wallet.privateKey;
    this.wallet = new ethers.Wallet(privateKey, provider);

    this.contract = new Contract(token.address, ABI, provider);
  }

  async getBalance(): Promise<number> {
    let balance: any = await this.contract.balanceOf(this.wallet.address);

    return (balance /= 10 ** this.token.decimals);
  }
}
