import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ApiClient from "./plugin/ApiClient";

Vue.config.productionTip = false;

Vue.use(ApiClient);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
