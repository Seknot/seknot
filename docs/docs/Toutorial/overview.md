---
sidebar_position: 1
title: はじめに
---

## 概要
このチュートリアルでは実際にトークンを発行し、発行したトークンを用いて簡単なDiscrod Botを制作します。

制作するBotのサンプルコードは https://github.com/Seknot/discord-bot-sample に掲載してあります。

## トークンの発行・活用までの流れ
![流れ](../img/flow.png)

Seknotのでは主にこのような流れでトークンの発行から移動までを行います。
このチュートリアルでは1つづつ、ステップに分けて紹介していきます。

## 事前準備
チュートリアルを進めるにあたっては、
- Wallet(Metamask)
- Discordアカウント

が必要となります。

### Walletの設定とMATICの入手

Seknotは現在`Polygon Mumbai Testnet`でのみ動作します  
Testnetとは開発用のネットワークで、内部の仕組みは`Mainnet`とほぼ同じですが、流通しているMATICは価値を持ちません。

MATICはPolygonネットワークにおける基軸通貨です。

1. [Chromeウェブストア](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ja) にアクセスして、Metamaskをインストールします
2. Metamaskを起動して、表示に従ってアカウントを作成します
3. [Polygonscan mumbai](https://mumbai.polygonscan.com/) にアクセスし、ページのフッターにある`Add Mumbai Network`を押すとPolygon Mumbai TestnetがWalletに追加されます
4. MetamaskのネットワークからPolygon Testnetを選択します
5. [polygon Faucet](https://faucet.polygon.technology/) にアクセスして、Networkを`Mumbai`、Select Tokenを`MATIC Token`、Wallet Addressに自分のWalletのアドレスを入力して、`Submit`を押すことでTestnetで使えるMATICを入手することができます。  
1回押すごとに`1MATIC`が受け取ることができ、1~2分ほどの間隔をあけるともう一度受け取ることができるようになります。簡単に試す程度であれば`1~3MATIC`あれば十分です。

Discordに関しては、アカウントを作成して[Discord Developer Portal](https://discord.com/developers/applications) にログインできることを確かめてください。

### ここまで準備できたら早速トークンを発行していきましょう！
