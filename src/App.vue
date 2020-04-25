<template>
  <v-app class="podcasts-app">
    <Header />
    <v-content>
      <router-view />
      <CookiesConsent />
    </v-content>
  </v-app>
</template>

<script>
import Header from "./components/Header";
import CookiesConsent from "./components/CookiesConsent";

export default {
  name: "App",

  components: {
    Header,
    CookiesConsent
  },

  data: () => ({
    //
  })
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900');

.podcasts-app.v-application .primary--text {
  color: #08415c !important;
}
.container,
.v-toolbar__content {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
.center-flex-vertically {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.flex-right {
  justify-content: flex-end;
}
</style>
