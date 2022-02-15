<template>

</template>

<script>
export default {
  name: 'login',
  mounted () {
    this.$auth.loginWith('auth0')
      .then(() => {
        this.$forceUpdate()
      })
  }
}
</script>

<style scoped>

</style>
