<template>
  <v-app id="app">
    <v-main id="content" class="content">
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "./components/layout/Footer.vue";

export default {
  name: "App",
  components: {
    Footer: Footer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  margin: 0;
  background-color: rgb(240, 242, 236);
}
</style>