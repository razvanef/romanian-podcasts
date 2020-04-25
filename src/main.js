import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import VueAnalytics from "vue-analytics";

Vue.config.productionTip = false;

// Configuration VueAnalytics
Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_ANALYTICS_KEY
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
