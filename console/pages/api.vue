<template>
  <b-container>
    <h1>Services</h1>
    <b-table striped hover :items="items"></b-table>
  </b-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'api',
  middleware: 'auth',
  data () {
    return {
      items: [
        {
          age: 40,
          first_name: 'Dickerson',
          last_name: 'Macdonald'
        },
        {
          age: 21,
          first_name: 'Larsen',
          last_name: 'Shaw'
        },
        {
          age: 89,
          first_name: 'Geneva',
          last_name: 'Wilson'
        },
        {
          age: 38,
          first_name: 'Jami',
          last_name: 'Carney'
        }
      ]
    }
  },
  mounted () {
    this.getServices()
  },
  methods: {
    getServices () {
      const accessToken = this.$auth.strategy.token.get()
      const options = {
        method: 'GET',
        url: 'https://api.seknot.net/service',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken
        }
      }

      axios.request(options).then(function (response) {
        console.log(response.data)
      }).catch(function (error) {
        console.error(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
