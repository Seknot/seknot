<template>

</template>

<script>
export default {
  name: 'logout',
  async mounted () {
    await this.$auth.logout()
  }
}
</script>

<style scoped>

</style>
