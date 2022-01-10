/*
 Walletの作成
*/
require('dotenv').config();
const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "remember naive stairs dose six decorate catalog banner gaze tiny into lady";
const host = process.env.host

const provider = new HDWalletProvider(mnemonic, host, 0, 100);
const Web3 = require('web3');
const ethers = require('ethers')

exports.createWallet = () => {
    // Walletを作成
    const wallet = ethers.Wallet.createRandom()
    return wallet
}


// exports.getBalance = async function (address) {
//     let balance = parseFloat(await contract.methods.balanceOf(address).call())
//     let decimals = parseFloat(await contract.methods.decimals().call())
//     balance /= 10 ** decimals
//     return balance
// }
//
// exports.sendToken = async function (from, to, value) {
//
//     const data = contract.methods
//         .transfer(to, value).encodeABI();
//
//     const txCount = await web3.eth.getTransactionCount(account.address);
//     console.log(txCount)
//     const txObject = {
//         nonce: web3.utils.toHex(txCount),
//         to: settings.contract,
//         value: web3.utils.toHex(web3.utils.toWei('0', 'ether')),
//         gasLimit: web3.utils.toHex(2100000),
//         gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
//         data: data
//     }
//     // Sign the transaction
//     const tx = new Tx(txObject, {'chain': 'ropsten'});
//     tx.sign(Buffer.from(settings.privateKey, 'hex'));
//
//     const serializedTx = tx.serialize();
//     const raw = '0x' + serializedTx.toString('hex');
//
//     // Broadcast the transaction
//     const transaction = await web3.eth.sendSignedTransaction(raw);
//     return transaction
// }
