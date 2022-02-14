import { ethers } from 'ethers';
import { Token } from '../../models/TokenModel';
import { Wallet } from '../../models/WalletModel';

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
  console.log('Here');
  console.log(
    token.name,
    token.version,
    token.symbol,
    token.decimals,
    token.totalSupply,
  );
  const instance = await contract.deploy(
    token.name,
    token.version,
    token.symbol,
    token.decimals,
    token.totalSupply,
  );
  await instance.deployed();
  token.address = instance.address;

  return token;
}
