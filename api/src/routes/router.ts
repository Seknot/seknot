import express from 'express';

const router = express.Router();
const util = require('../utils/random');

const { createWallet } = require('../service/wallet/issueWallet');
const { createToken } = require('../service/createToken');

// Ping for health check
router.get('/ping', (req: express.Request, res: express.Response) => {
  res.json({
    status: 'healthy',
    time: new Date().getTime(),
  });
});

// /**
//  * GET: /users ユーザー一覧取得
//  */
// router.get('/users', (req: express.Request, res: express.Response) => {
//   documentClient
//     .scan({
//       TableName: 'Users',
//     })
//     .promise()
//     .then((result) => res.json(result))
//     .catch((e) => res.status(422).json({ errors: e }));
// });
//
// /**
//  * GET: /user/:userId ユーザー取得
//  * @param userId 取得対象ユーザーのIDを指定
//  */
// router.get('/user/:userId', (req: express.Request, res: express.Response) => {
//   // 本来はuserIdのvalidationチェックが必要
//   documentClient
//     .get({
//       TableName: 'Users',
//       Key: {
//         id: parseInt(req.params.userId),
//       },
//     })
//     .promise()
//     .then((result) => res.json(result))
//     .catch((e) => res.status(422).json({ errors: e }));
// });
//
// /**
//  * POST: /user ユーザー作成API
//  * @param {req.body} { name: User Name, email: MailAddress, password: PassWord Hash }
//  */
// router.post('/user/register', (req: express.Request, res: express.Response) => {
//   const newData = {
//     id: util.getRandomId(),
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//   };
//   documentClient
//     .put({
//       TableName: 'Users',
//       Item: newData,
//     })
//     .promise()
//     .then((result) => res.json(newData))
//     .catch((e) => res.status(422).json({ errors: e }));
// });
//
// /**
//  * Wallet作成 API
//  */
// router.post('/wallet/create', (req: express.Request, res: express.Response) => {
//   let wallet = createWallet();
//   let walletData = {
//     id: util.getRandomId(),
//     address: wallet.address,
//     privateKey: wallet.privateKey,
//     publicKey: wallet.publicKey,
//     mnemonic: wallet.mnemonic,
//   };
//   documentClient
//     .put({
//       TableName: 'Wallets',
//       Item: walletData,
//     })
//     .promise()
//     .then((result) => res.json(walletData))
//     .catch((e) => res.status(422).json({ errors: e }));
// });
//
// router.get('/wallet/list', (req: express.Request, res: express.Response) => {
//   documentClient
//     .scan({
//       TableName: 'Wallets',
//     })
//     .promise()
//     .then((result) => res.json(result))
//     .catch((e) => res.status(422).json({ errors: e }));
// });
//
// router.post(
//   '/token/create',
//   async (req: express.Request, res: express.Response) => {
//     const serviceWallet = createWallet();
//     const network = 'ropsten';
//     console.log(req.body.tokenName);
//     if (
//       !(
//         req.body.tokenName ||
//         req.body.tokenVersion ||
//         req.body.tokenSymbol ||
//         req.body.tokenTotalSupply ||
//         req.body.userId
//       )
//     ) {
//       res.status(422).json({ errors: 'Parameter missing!' });
//     }
//     const tokenContractAddress = await createToken(
//       network,
//       req.body.tokenName,
//       req.body.tokenVersion,
//       req.body.tokenSymbol,
//       0,
//       req.body.tokenTotalSupply,
//     );
//
//     let newData = {
//       id: util.getRandomId(),
//       name: req.body.tokenName,
//       version: req.body.tokenVersion,
//       symbol: req.body.tokenSymbol,
//       decimals: 0,
//       totalSupply: req.body.tokenTotalSupply,
//       owner: req.body.userId,
//       contractAddress: tokenContractAddress,
//       serviceWallet: {
//         address: serviceWallet.address,
//         privateKey: serviceWallet.privateKey,
//         publicKey: serviceWallet.publicKey,
//         mnemonic: serviceWallet.mnemonic,
//       },
//     };
//     documentClient
//       .put({
//         TableName: 'Tokens',
//         Item: newData,
//       })
//       .promise()
//       .then((result) => res.json(newData))
//       .catch((e) => res.status(422).json({ errors: e }));
//   },
// );
//
// router.get('/token/list', (req: express.Request, res: express.Response) => {
//   documentClient
//     .scan({
//       TableName: 'Tokens',
//     })
//     .promise()
//     .then((result) => res.json(result))
//     .catch((e) => res.status(422).json({ errors: e }));
// });
//
// router.get(
//   '/token/list/user/:userId',
//   (req: express.Request, res: express.Response) => {
//     documentClient
//       .scan({
//         TableName: 'Tokens',
//         ProjectionExpression: 'owner',
//         ExpressionAttributeNames: {
//           owner: req.params.userId,
//         },
//       })
//       .promise()
//       .then((result) => res.json(result))
//       .catch((e) => res.status(422).json({ errors: e }));
//   },
// );

module.exports = router;
