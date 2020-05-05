import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import VueAnalytics from "vue-analytics";
import VueMeta from "vue-meta";

Vue.config.productionTip = false;
console.log(process.env.VUE_APP_ANALYTICS_KEY)
// Configuration VueAnalytics
Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_ANALYTICS_KEY,
  router
});

Vue.use(VueMeta, {
  // optional pluginOptions
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
