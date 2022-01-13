import { ethers } from 'ethers';

const compiled = require('../../assets/token/build/Token.json');

export default async function createToken(
  tokenName: string,
  tokenVersion: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenTotalSupply: number,
) {
  const NODE_URL =
    'https://polygon-mumbai.infura.io/v3/ac7dd9c52b7c46cbbaa07783eb437574';
  const provider = new ethers.providers.JsonRpcProvider(NODE_URL);
  const privateKey =
    'f8ecdf82c55df2fad204b78295506ae857c5c36c33076ef1b57ca7365c411546';
  const wallet = new ethers.Wallet(privateKey, provider);
  const contract = new ethers.ContractFactory(
    compiled.abi,
    compiled.bytecode,
    wallet,
  );

  const instance = await contract.deploy(
    tokenName,
    tokenVersion,
    tokenSymbol,
    tokenDecimals,
    tokenTotalSupply,
  );
  await instance.deployed();

  return instance.address;
}
