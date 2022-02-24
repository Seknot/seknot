<template>
  <b-container>
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
    <b-table striped hover :items="items"></b-table>
    <hr>
    <h1>Service Walletの情報</h1>
    <b-form-select v-model="selected" :options="options" @change="onServiceSelected"></b-form-select>
    <span>WalletAddress: {{ selected.wallet }}</span><br>
    <span>ServiceId: {{ selected.id }}</span><br>
    <span>Balance: {{ serviceWalletBalance }}</span><br>
    <span>GASTankBalance: {{ GAStankBalance }}</span>
    <hr>
    <h1>API Keys</h1>
    このAPI Keyは厳重に保管してください
    <table class="table table-borderless">
      <tbody>
      <tr>
        <th scope="row">client_id</th>
        <td><samp>{{ apiKey.client_id }}</samp></td>
      </tr>
      <tr>
        <th scope="row">client_secret</th>
        <td><samp>{{ apiKey.client_secret }}</samp></td>
      </tr>
      </tbody>
    </table>
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

  serviceWalletBalance: string | null = null
  GAStankBalance: string | null = null

  async fetch () {
    await this.getServices()
    await this.getAPIKey()
  }

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
        id: item.id,
        delete: '<a>Delete</a>'
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

  async getAPIKey () {
    const accessToken = this.$auth.strategy.token.get()
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: BASE_URL + `/service/`,
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
    this.serviceWalletBalance = await this.getServiceWalletBalance()
    this.GAStankBalance = await this.getGAStankBalance()
  }

  async getServiceWalletBalance () {
    const accessToken = this.$auth.strategy.token.get()
    const id = this.selected.id
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

  async getGAStankBalance () {
    const accessToken = this.$auth.strategy.token.get()
    const id = this.selected.id
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
}
</script>

<style scoped>

</style>
