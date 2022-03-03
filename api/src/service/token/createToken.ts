import { ethers } from 'ethers';
import { Token } from '../../models/TokenModel';
import { Wallet } from '../../models/WalletModel';
import { InternalServerError } from 'routing-controllers';

const compiled = require('../../assets/token/build/Token.json');

export default async function createToken(
  token: Token,
  serviceWallet: Wallet,
): Promise<Token> {
  const provider = new ethers.providers.InfuraProvider('maticmum', {
    projectId: process.env.INFURA_PROJECT_ID,
    projectSecret: process.env.INFURA_PROJECT_SECRET,
  });
  const privateKey = serviceWallet.privateKey;
  const wallet = new ethers.Wallet(privateKey, provider);
  const contract = new ethers.ContractFactory(
    compiled.abi,
    compiled.bytecode,
    wallet,
  );

  console.log(
    token.name,
    token.version,
    token.symbol,
    token.decimals,
    token.totalSupply,
  );

  const tx = contract.getDeployTransaction(
    token.name,
    token.version,
    token.symbol,
    token.decimals,
    token.totalSupply,
  );
  tx.from = '0x9193ab3DCadc8F0B1A0ed19CB0395247f387222c';

  const overrides = {
    gasPrice: 8 * 1e10,
  };

  const instance = await contract.deploy(
    token.name,
    token.version,
    token.symbol,
    token.decimals,
    token.totalSupply,
    overrides,
  );

  await instance.deployed();
  token.address = instance.address;

  return token;
}
