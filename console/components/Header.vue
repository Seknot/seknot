<template xmlns="http://www.w3.org/1999/html">
  <div>
    <BNavbar toggleable="lg" type="light">
      <BNavbarBrand href="/">
        <img src="@/static/logo.svg" alt="logo" height="50" />
      </BNavbarBrand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-on:click="login" v-if="!this.$store.state.auth.loggedIn">ログイン</b-nav-item>
          <!--          <b-navbar-brand v-else>-->
          <!--            <b-avatar class="mr-2" :src="this.$store.state.auth.user.picture"></b-avatar>-->
          <!--            <span class="mr-3">{{ this.$store.state.auth.user.name }}</span>-->
          <!--          </b-navbar-brand>-->
          <b-nav-item-dropdown right :text="this.$store.state.auth.user.name" v-else>
            <b-dropdown-item to="/api">ユーザー設定</b-dropdown-item>
            <b-dropdown-item v-on:click="logout">ログアウト</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </BNavbar>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Header',
  created () {
    this.$forceUpdate()
    console.log(this.$store.state.auth.user)
  },
  methods: {
    async login () {
      this.$auth.loginWith('auth0')
        .then(() => {
          this.$forceUpdate();
        })
    },
    async logout () {
      await this.$auth.logout()
    }
  }
})
</script>

<style scoped>

</style>
