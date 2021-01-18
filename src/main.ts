import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ApiClient from "./plugin/ApiClient";
import ToastPlugin from "./plugin/toast/ToastPlugin";

Vue.config.productionTip = false;

Vue.use(ApiClient);
Vue.use(ToastPlugin);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
