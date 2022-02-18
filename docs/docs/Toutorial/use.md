---
sidebar_position: 3
title: Discord Botの作成
---

## GASのDeposit

1. `/token/:tokenAddress/mint`にPOSTして、GASタンクにDepositする
```json
{
    "value": 0.5
}
```
`Service Wallet`からGAS TankへDepositするので、Service Walletに入っている以上のGASを送ることはできません。

2. `/service/:serviceId/deposit`にGETすると、GASタンクにDepositされているGASを取得することができます。

## Discord Botの作成

Discord Developer PortalからBotのAccess Tokenを取得してください。

[サンプルコード](https://github.com/Seknot/discord-bot-sample) をクローンして、
以下のような`.env`ファイルを作成します。

ここに、これまでで取得した情報を入力してください。  
詳しい使い方は、GitHubのREADMEを参照してください。

```
SERVICE_ID=<< Tokenが紐付いているServceのId >>
TOKEN_ADDRESS=<< 発行したTokenのAddress >>
CLIENT_ID=<< APIのclieent_id >>
CLIENT_SECRET=<< APIのcclient_secret >>
SYMBOL=<< TokenのSymbol >>

DB_USER=root
DB_PASS=password

DISCORD_TOKEN=<< Discord BotのToken >>
```

Botでは、DiscordのidをUIDとして結びつけてWalletを発行するようにしています。基本的には、各種APIを適宜呼び出しているだけなので詳細はAPI Docsを参照してください。

```javascript

class APIController {
	constructor(serviceId, tokenAddress) {
		this.serviceId = serviceId;
		this.tokenAddress = tokenAddress;
	}

	async getAccessToken() {
		const params = {
			client_id: process.env.CLIENT_ID,
			client_secret: process.env.CLIENT_SECRET,
			audience: "https://api.seknot.net",
			grant_type: "client_credentials",
		};
		const options = {
			method: "POST",
			url: "https://dev-xe71ik8z.us.auth0.com/oauth/token",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(params),
		};
		const output = JSON.parse(await request(options));
		return output.access_token;
	}

	async issueAccessToken() {
		this.accessToken = await this.getAccessToken();
	}

	async createWallet() {
		const options = {
			method: "POST",
			url: "https://api.seknot.net/wallet",
			headers: {
				authorization: "Bearer " + this.accessToken,
				"content-type": "application/json",
			},
			data: JSON.stringify({
				serviceId: this.serviceId,
			}),
		};
		return (await axios(options)).data.address;
	}

	async getBalance(address) {
		const options = {
			method: "GET",
			url: `https://api.seknot.net/token/${this.tokenAddress}/${address}/balance`,
			headers: {
				authorization: "Bearer " + this.accessToken,
				"content-type": "application/json",
			},
			data: JSON.stringify({
				serviceId: this.serviceId,
			}),
		};
		return (await axios(options)).data;
	}

	async issueToken(address, value) {
		const options = {
			method: "POST",
			url: `https://api.seknot.net/token/${this.tokenAddress}/mint`,
			headers: {
				authorization: "Bearer " + this.accessToken,
				"content-type": "application/json",
			},
			data: JSON.stringify({
				toAddress: address,
				value: value
			}),
		};
		return (await axios(options)).data;
	}

	async sendToken(address, value) {
		const options = {
			method: "POST",
			url: `https://api.seknot.net/token/${this.tokenAddress}/send`,
			headers: {
				authorization: "Bearer " + this.accessToken,
				"content-type": "application/json",
			},
			data: JSON.stringify({
				toAddress: address,
				value: value
			}),
		};
		return (await axios(options)).data;
	}
}
```
