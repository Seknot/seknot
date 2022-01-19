/*
 Walletの作成
*/

import { ethers } from 'ethers';

export async function issueWallet(): Promise<ethers.Wallet> {
  const wallet = new ethers.Wallet(ethers.utils.randomBytes(32));

  return wallet;
}
