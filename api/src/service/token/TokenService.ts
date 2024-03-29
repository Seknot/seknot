import { BigNumber, Contract, ethers } from 'ethers';
import WalletModel, { Wallet } from '../../models/WalletModel';
import { Token } from '../../models/TokenModel';
import { Service } from '../../models/ServiceModel';
import Web3 from 'web3';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import EIP712Domain from 'eth-typed-data';

const ABI = require('../../assets/token/build/Token.json').abi;

export class TokenService {
  contract!: ethers.Contract;
  wallet!: ethers.Wallet;
  serviceWallet!: ethers.Wallet;
  token!: Token;
  provider!: ethers.providers.InfuraProvider;
  ITX_Contract = '0x92A663df3553ED10BCb300B9bA0D8a2f3bea5a85'; //ITX Contract
  web3!: any;

  static async init(wallet: Wallet, token: Token, service: Service) {
    const obj = new TokenService();

    obj.token = token;

    const provider = new ethers.providers.InfuraProvider('maticmum', {
      projectId: process.env.INFURA_PROJECT_ID,
      projectSecret: process.env.INFURA_PROJECT_SECRET,
    });
    const privateKey = wallet.privateKey;
    obj.wallet = new ethers.Wallet(privateKey, provider);
    obj.contract = new Contract(token.address, ABI, provider);
    obj.provider = provider;

    const serviceWallet: Wallet = await WalletModel.getWalletByAddress(
      service.serviceWallet,
    );
    obj.serviceWallet = new ethers.Wallet(serviceWallet.privateKey, provider);

    return obj;
  }

  async getBalance(): Promise<number> {
    const balance: any = await this.contract.balanceOf(this.wallet.address);

    return balance / 10 ** this.token.decimals;
  }

  async getWalletBalance(): Promise<number> {
    return (await this.wallet.getBalance()).toNumber();
  }

  async getServiceWalletBalance(): Promise<string> {
    return ethers.utils.formatEther(await this.serviceWallet.getBalance());
  }

  async transfer(
    from: ethers.Wallet,
    to: ethers.Wallet,
    balance: number,
  ): Promise<string> {
    const domain = {
      name: await this.contract.name(),
      version: await this.contract.version(),
      chainId: await this.wallet.getChainId(),
      verifyingContract: this.token.address,
    };

    const types = {
      TransferWithAuthorization: [
        {
          name: 'from',
          type: 'address',
        },
        {
          name: 'to',
          type: 'address',
        },
        {
          name: 'value',
          type: 'uint256',
        },
        {
          name: 'validAfter',
          type: 'uint256',
        },
        {
          name: 'validBefore',
          type: 'uint256',
        },
        {
          name: 'nonce',
          type: 'bytes32',
        },
      ],
    };

    const message = {
      from: from.address,
      to: to.address,
      value: balance.toString(10),
      validAfter: 0,
      validBefore: Math.floor(Date.now() / 1000) + 3600, // Valid for an hour
      nonce: Web3.utils.randomHex(32),
    };

    console.log(message);
    console.log(domain);

    let signedData = await from._signTypedData(domain, types, message);
    console.log(
      ethers.utils.verifyTypedData(domain, types, message, signedData),
    );

    signedData = signedData.substring(2);
    const r = '0x' + signedData.substring(0, 64);
    const s = '0x' + signedData.substring(64, 128);
    const v = parseInt(signedData.substring(128, 130), 16);

    console.log('v:', v, 'r:', r, 's:', s);

    const tokenInterface = new ethers.utils.Interface(ABI);

    const encodedData = tokenInterface.encodeFunctionData(
      'transferWithAuthorization',
      [
        from.address,
        to.address,
        balance,
        message.validAfter,
        message.validBefore,
        message.nonce,
        v,
        r,
        s,
      ],
    );

    const tx = {
      to: this.token.address,
      data: encodedData,
      gas: '7000000',
      schedule: 'fast',
    };

    const hash = ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(
        ['address', 'bytes', 'uint', 'uint', 'string'],
        [tx.to, tx.data, tx.gas, await this.wallet.getChainId(), tx.schedule], // Ropsten chainId is 3
      ),
    );
    const signature = await this.serviceWallet.signMessage(
      ethers.utils.arrayify(hash),
    );
    const relayTransactionHash = await this.provider.send(
      'relay_sendTransaction',
      [tx, signature],
    );

    return relayTransactionHash;
  }

  async issueToken(balance: number): Promise<string> {
    // Tokenを鋳造する
    return await this.transfer(this.serviceWallet, this.wallet, balance);
  }

  async sendToken(to: Wallet, balance: number): Promise<string> {
    // Tokenを送金
    return await this.transfer(
      this.wallet,
      new ethers.Wallet(to.privateKey, this.provider),
      balance,
    );
  }
}

export class GasService {
  serviceWallet!: ethers.Wallet;
  provider!: ethers.providers.InfuraProvider;
  ITX_Contract = '0x92A663df3553ED10BCb300B9bA0D8a2f3bea5a85'; //ITX Contract
  web3!: any;

  static async init(service: Service) {
    const obj = new GasService();

    const provider = new ethers.providers.InfuraProvider('maticmum', {
      projectId: process.env.INFURA_PROJECT_ID,
      projectSecret: process.env.INFURA_PROJECT_SECRET,
    });
    obj.provider = provider;

    const serviceWallet: Wallet = await WalletModel.getWalletByAddress(
      service.serviceWallet,
    );
    obj.serviceWallet = new ethers.Wallet(serviceWallet.privateKey, provider);

    return obj;
  }

  async getITXBalance(): Promise<number> {
    const balance: any = await this.provider.send('relay_getBalance', [
      this.serviceWallet.address,
    ]);

    return balance.balance / 10 ** 18;
  }

  async depositGAS(
    balance: number,
  ): Promise<ethers.providers.TransactionReceipt> {
    let tx = await this.serviceWallet.sendTransaction({
      to: this.ITX_Contract,
      value: ethers.utils.parseUnits(String(balance), 'ether'),
      gasPrice: 8 * 1e10,
    });

    return await tx.wait();
  }

  async getServiceWalletBalance(): Promise<BigNumber> {
    return await this.serviceWallet.getBalance();
  }
}
