<template>
  <v-app class="podcasts-app">
    <Header />
    <v-content>
        <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/Header';

export default {
  name: "App",

  components: {
    Header,
  },

  data: () => ({
    //
  })
};
</script>

<style lang="scss">
    .podcasts-app.v-application .primary--text {
      color: #08415C !important;
    }
    .container, .v-toolbar__content {
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
