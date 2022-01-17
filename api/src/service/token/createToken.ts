import { ethers } from 'ethers';
import { Token } from '../../models/TokenModel';
import { Wallet } from '../../models/WalletModel';

const compiled = require('../../assets/token/build/Token.json');

export default async function createToken(
  token: Token,
  serviceWallet: Wallet,
): Promise<Token> {
  const NODE_URL =
    'https://polygon-mumbai.infura.io/v3/ac7dd9c52b7c46cbbaa07783eb437574';
  const provider = new ethers.providers.JsonRpcProvider(NODE_URL);
  const privateKey = serviceWallet.privateKey;
  const wallet = new ethers.Wallet(privateKey, provider);
  const contract = new ethers.ContractFactory(
    compiled.abi,
    compiled.bytecode,
    wallet,
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
