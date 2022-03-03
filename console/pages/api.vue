<template>
  <b-container>
    <b-tabs fill>
      <b-tab title="Services" active>
        <b-card-text>
          <b-container class="pt-3">
            <h1>Services</h1>
            <b-form inline class="py-2">
              <b-form-input
                v-model="serviceName"
                class="mb-2 mr-sm-2 mb-sm-0"
                placeholder="Service Name"
              ></b-form-input>
              <b-button variant="primary" @click="createService">Create Service</b-button>
              <b-button variant="success" class="mx-2" :v-on:click="getServices">Reload</b-button>
            </b-form>
            <b-table striped hover :items="items" responsive></b-table>
            <hr>
            <h3>Service Walletの情報</h3>
            <b-form-select v-model="selected" :options="options" @change="onServiceSelected"></b-form-select>
            <div v-if="selected.id != ''">
              <p class="p-3">
                <span>WalletAddress: <code>{{ selected.wallet }}</code></span><br>
                <span>ServiceId: <code>{{ selected.id }}</code></span><br>
                <span>Balance: <code>{{ serviceWalletBalance }} MATIC</code></span><br>
                <span>GASTankBalance: <code>{{ GAStankBalance }} MATIC</code></span><br>
                <span>NetWork: <code>Polygon (Munbai)</code></span>
              </p>
              <p><a href="https://faucet.polygon.technology/">Polygon
                Faucet</a>でWalletAddressを指定して送信することでTestnet用の<code>MATIC</code>を入手することができます
              </p>

              <h3>Gas TankへDeposit</h3>
              <p>
                Seknotを使用してトークンの移動を行う際に発生するGASは、GasTankから利用されます。<br>
                サービスを運用する際には、一定量のGASがGAS Tankに存在する必要があります。<br>
                なお、一度Gas TankにDepositされた<code>MATIC</code>は現時点では戻すことができないので注意してください。<br>
                また、Service Walletに存在する量を超えてDepositすることはできません。<br>
              </p>
              Amount to Deposit
              <b-form inline class="py-2">
                <b-form-input
                  v-model="depositAmount"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  placeholder="Deposit Amount"
                ></b-form-input>
                <b-button variant="primary" @click="depositGAS">Deposit</b-button>
              </b-form>
              <span>{{ gasDepositResult }}</span>
            </div>
          </b-container>
        </b-card-text>
      </b-tab>
      <b-tab title="Tokens">
        <b-card-text>
          <b-container class="pt-3">
            <h1>Tokens</h1>
            <p>Service Walletに結びつけて新しくTokenを発行します。<br>
              発行をする際にGAS代が必要となるため、あらかじめService Walletに対して必要量の<code>MATIC</code>を送金してください。<br>
              具体的な方法については<a href="https://docs.seknot.net">ドキュメント</a>をご参照ください。</p>
            Service:
            <b-form-select v-model="selected" :options="options" @change="onServiceSelected"></b-form-select>
            <p class="p-2">
              <span>WalletAddress: <code>{{ selected.wallet }}</code></span><br>
              <span>Balance: <code>{{ serviceWalletBalance
                }} MATIC</code></span>（必ず<code>0</code>ではないことを確認してから発行してださい）<br>
              <span>GASTankBalance: <code>{{ GAStankBalance }} MATIC</code></span>
            </p>
            <b-button v-b-modal.modal-prevent-closing variant="info" v-if="selected.id!==''">Issue Token</b-button>
            <b-table striped hover :items="tokens" responsive></b-table>
            <!-- Modal for Input Token Info -->
            <b-modal
              id="modal-prevent-closing"
              ref="modal"
              title="Issue new Token"
              @ok="tokenConfirm"
              @show="resetToken"
            >
              <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                  label="Token Name"
                  label-for="name-input"
                  invalid-feedback="Token Name is required"
                >
                  <b-form-input
                    id="name-input"
                    v-model="tokenName"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  label="Token Version(バージョン)"
                  label-for="name-input"
                  invalid-feedback="Token Name is required"
                >
                  <b-form-input
                    id="name-input"
                    v-model="tokenVersion"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  label="Token Total Supply(総発行量)"
                  label-for="name-input"
                  invalid-feedback="Token Name is required"
                >
                  <b-form-input
                    id="name-input"
                    v-model="tokenTotalSupply"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  label="Token Symbol(単位)"
                  label-for="name-input"
                  invalid-feedback="Token Name is required"
                >
                  <b-form-input
                    id="name-input"
                    v-model="tokenSymbol"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  label="Token Decimals(小数点以下の桁数)"
                  label-for="name-input"
                  invalid-feedback="Token Name is required"
                >
                  <b-form-input
                    id="name-input"
                    v-model="tokenDecimals"
                    required
                  ></b-form-input>
                </b-form-group>
              </form>
            </b-modal>
            <b-modal id="issue-token" hide-header ok-only>
              <div class="text-center" v-if="isCreating">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <div v-else>
                トークンを発行しました！
                <p>
                  <code>{{ tokenAddress }}</code>
                </p>
              </div>
            </b-modal>

          </b-container>
        </b-card-text>
      </b-tab>
      <b-tab title="Wallets">
        <b-card-text>
          <b-container class="pt-3">
            <h1>Wallets</h1>
            Service:
            <b-form-select v-model="selected" :options="options" @change="onServiceSelected"></b-form-select>
            <b-button variant="primary" @click="createWallet" v-if="selected.id != ''">Create Wallet</b-button>
            <b-table striped hover :items="wallets" responsive></b-table>
          </b-container>
        </b-card-text>
      </b-tab>
      <b-tab title="API Keys">
        <b-card-text>
          <b-container class="pt-3">
            <h1>API Keys</h1>
            このAPI Keyは厳重に保管してください
            <table class="table table-borderless table-responsive">
              <tbody>
              <b-button @click="rotateApiKey">Regenerate</b-button>
              <tr>
                <th scope="row">client_id</th>
                <td><code>{{ apiKey.client_id }}</code></td>
              </tr>
              <tr>
                <th scope="row">client_secret</th>
                <td><code>{{ apiKey.client_secret }}</code></td>
              </tr>
              </tbody>
            </table>
          </b-container>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import axios, { AxiosRequestConfig } from 'axios'
import { ApiKey, Item, SelectOption, Service } from '~/src/types/apiTypes'

const BASE_URL = 'https://api.seknot.net'

@Component({
  middleware: ['auth']
})
export default class ApiComponent extends Vue {
  items: Item[] = []
  wallets: any = []
  tokens: any = []
  serviceName: string = ''
  apiKey: ApiKey = {
    client_id: '',
    client_secret: ''
  }

  selected: {
    id: string
    wallet: string
  } = {
    id: '',
    wallet: ''
  }

  options: SelectOption[] = []

  $auth: any
  $swal: any
  $bvModal: any

  serviceWalletBalance: string | null = null
  GAStankBalance: string | null = null

  // Token Input Form
  tokenName: string = ''
  tokenVersion: string = '1.0'
  tokenTotalSupply: number = 0
  tokenSymbol: string = ''
  tokenDecimals: number = 0

  async fetch () {
    await this.getAPIKey()
    await this.getServices()
  }

  tokenAddress: string = ''
  isCreating: boolean = false

  async createService () {
    if (this.serviceName.length == 0) {
      alert('Service name is required')
      return
    }
    const accessToken = this.$auth.strategy.token.get()
    await axios.post(BASE_URL + '/service', {
      name: this.serviceName,
      uid: this.$store.state.auth.user.sub
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    })
    await this.getServices()
  }

  async getServices () {
    const accessToken = this.$auth.strategy.token.get()
    const uid = this.$store.state.auth.user.sub
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: BASE_URL + `/service/all/${uid}`,
      headers: {
        Authorization: accessToken
      }
    }
    let data: Service[] = (await axios.request(options)).data
    this.items = data.map(item => {
      return {
        name: item.name,
        wallet: item.serviceWallet,
        id: item.id
      } as Item
    })
    this.options = data.map(item => {
      return {
        text: item.name,
        value: {
          id: item.id,
          wallet: item.serviceWallet
        }
      } as SelectOption
    })
  }

  async getWallets () {
    const accessToken = this.$auth.strategy.token.get()
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: BASE_URL + `/wallet/all/${this.selected.id}`,
      headers: {
        Authorization: accessToken
      }
    }
    return (await axios.request(options)).data
  }

  async getAPIKey () {
    const accessToken = this.$auth.strategy.token.get()
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: BASE_URL + `/user/${this.$store.state.auth.user.sub}/get`,
      headers: {
        Authorization: accessToken
      }
    }
    let data = (await axios.request(options)).data
    this.apiKey = data
  }

  async onServiceSelected () {
    if (this.selected.id === '' && this.selected.id === '') {
      return
    }
    this.serviceWalletBalance = 'Loading...'
    this.GAStankBalance = 'Loading...'
    this.serviceWalletBalance = await this.getServiceWalletBalance(this.selected.id)
    this.GAStankBalance = await this.getGAStankBalance(this.selected.id)
    this.tokens = await this.getTokens(this.selected.wallet)
    console.log(await this.getWallets())
    this.wallets = await this.getWallets()
  }

  async getServiceWalletBalance (id: string) {
    const accessToken = this.$auth.strategy.token.get()
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: BASE_URL + `/service/${id}/balance`,
      headers: {
        Authorization: accessToken
      }
    }
    let data = (await axios.request(options)).data
    return data
  }

  async getGAStankBalance (id: string) {
    const accessToken = this.$auth.strategy.token.get()
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: BASE_URL + `/service/${id}/deposit`,
      headers: {
        Authorization: accessToken
      }
    }
    let data = (await axios.request(options)).data
    return data
  }

  async getTokens (address: string) {
    const accessToken = this.$auth.strategy.token.get()
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: BASE_URL + `/token/all/${address}`,
      headers: {
        Authorization: accessToken
      }
    }
    let data = (await axios.request(options)).data
    return data
  }

  async rotateApiKey () {
    this.apiKey = {
      client_id: 'Creating...',
      client_secret: ''
    }
    const accessToken = this.$auth.strategy.token.get()
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: BASE_URL + `/user/${this.$store.state.auth.user.sub}/rotate`,
      headers: {
        Authorization: accessToken
      }
    }
    let data = (await axios.request(options)).data
    this.apiKey = {
      client_id: data.client_id,
      client_secret: data.client_secret
    } as ApiKey
  }

  async tokenConfirm () {
    const messageNodes = this.$createElement(
      'div',
      {
        domProps: {
          innerHTML: '以下の内容でTokenを発行します<br>' +
            'TokenName: ' + this.tokenName + '<br>' +
            'TokenVersion: ' + this.tokenVersion + '<br>' +
            'TokenTotalSupply: ' + this.tokenTotalSupply + '<br>' +
            'TokenSymol: ' + this.tokenSymbol + '<br>' +
            'TokenDecimals: ' + this.tokenDecimals + '<br>'
        }
      }
    )
    this.$bvModal.msgBoxConfirm([messageNodes])
      .then(async () => {
        this.isCreating = true
        this.$bvModal.show('issue-token')
        this.tokenAddress = await this.issueToken()
        this.isCreating = false
      })
      .catch((err: any) => {
        // An error occurred
      })
  }

  async resetToken () {
    this.tokenName = ''
    this.tokenVersion = '1.0'
    this.tokenTotalSupply = 0
    this.tokenSymbol = ''
    this.tokenDecimals = 0
  }

  async issueToken () {
    const accessToken = this.$auth.strategy.token.get()
    const response: any = await axios.post(BASE_URL + '/token', {
      name: this.tokenName,
      version: this.tokenVersion,
      symbol: this.tokenSymbol,
      totalSupply: this.tokenTotalSupply,
      decimals: this.tokenDecimals,
      serviceWallet: this.selected.wallet
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    })
    return response.data.address
  }

  depositAmount: number = 0.0
  gasDepositResult: string = ''

  async depositGAS () {
    this.gasDepositResult = 'Sending TX...'
    const id = this.selected.id
    const accessToken = this.$auth.strategy.token.get()
    await axios.post(BASE_URL + `/service/${id}/deposit`, {
      value: this.depositAmount
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    })
    this.gasDepositResult = ''
    this.$bvModal.msgBoxOk(this.depositAmount + 'MATICをGasTankに移動しました!')
  }

  async createWallet(){
    const accessToken = this.$auth.strategy.token.get()
    await axios.post(BASE_URL + '/wallet', {
      serviceId: this.selected.id
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    })
    await this.getWallets()
  }
}
</script>

<style scoped>

</style>
