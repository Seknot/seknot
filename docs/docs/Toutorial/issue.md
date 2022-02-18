---
sidebar_position: 2
title: トークンの発行
---

実際にトークンを発行していきます。  
APIの呼び出し出しの詳細はAPI Docsをご参照ください。また、便利なPostmanのCollectionを配布しているので、良ければご利用ください。

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/478b83685cc45f50f043?action=collection%2Fimport)

## Access Tokenの取得

1. [Seknot Console](https://seknot.net/) にアクセスし、右上の`ログイン`からログインしてください。ログインする際にはTypeTalkアカウントが必要です。  
今後、オープンβとして提供する際にはGoogleアカウントなど他の認証方法にも対応する予定です。
2. ログイン後、右上のリストから`ユーザー設定`を開いてください。
3. ページの下側に正しく`API Keys`が表示されていれば大丈夫です。  
取得したAPI Keyは**厳重に保管**してください。
4. 入手したAPI Key情報に基づいてOauthでaccess_tokenを取得してください。  
今後のAPI呼び出しでは、全てにAuthorizationヘッダーを付与してください。   
Postmanを利用する場合は、`Client ID`と`Client Secret`を指定してから`Get New Access Token`をクリックすると発行可能です。

## Serviceの作成
1. 同じページの丈夫にある`Services`の入力欄に作成するサービスの名前を入力して`Create Service`を押してください。ここでは、`discord-bot`と設定します。
2. 作成後に`Reload`ボタンを押すと、下に`discord-bot`と名前のついたサービスが作成されていることが確認できます。  
このとき、`Service Wallet`と`id`を必ずメモしておいてください。

## GASの送金
1. 新しくTokenを発行する際には、`GAS`と呼ばれる手数料が必要となります。  
先の手順で取得した`Service Wallet`に対して`1~3MATIC`程度を送金してください。  
これは今後のGAS TankへのDepositにも使用されます。
2. `/service/:serviceId/balance`でGETすると現在のService Walletに存在するMATICの残高を確認することが可能です。

**現状では、一度Service Walletに送金されたMATICは戻すことはできないので注意してください**

## Tokenの発行
1. `/token`をしてTokenを発行します。
```json
{
    "name": "TestCoin",
    "version": "1.0",
    "symbol": "HACK",
    "totalSupply": 1000,
    "decimals": 0,
    "serviceWallet": "<< Your Service Wallet >>"
}
```
このとき、上のようにTokenの名前やsymbolなどを指定する必要があります。
2. 無事に実行が終わると発行されたTokenの情報を取得できます。このとき必ず、Tokenの`address`をメモしておいてください。  
3. Polygon Scan maticなどで実際にアドレスを入力してみると指定した通りのTokenが発行されていることが確認できます。 
