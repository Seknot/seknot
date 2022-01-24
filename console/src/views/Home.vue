<template>
  <div>
    <hero />
    <div class="justify-content-center d-flex px-1">
      <a class="btn btn-outline-success btn-lg m-2" href="https://docs.seknot.net">Document</a>
      <a class="btn btn-outline-primary btn-lg m-2" href="https://seknot.stoplight.io/docs/developer-api">API Docs</a>
    </div>
    <hr />
    <home-content />
  </div>
</template>

<script>
import Hero from "../components/Hero";
import HomeContent from "../components/HomeContent";

export default {
  name: "home",
  components: {
    Hero,
    HomeContent
  }
};
</script>

<style lang="scss" scoped>
.next-steps {
  .fa-link {
    margin-right: 5px;
  }
}
</style>
