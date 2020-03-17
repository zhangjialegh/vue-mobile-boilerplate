import Vue from "vue";
import "@assets/js/viewpoint";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@assets/css/common.less";
// vant
import "vant/lib/button/style";
import { vants, vantCmp } from "./widgets/vant-components";
Vue.use(vants);

// gb
import gb from "./widgets/gb";
Vue.use(gb, vantCmp);

// axios
import axios from "./widgets/axios";
Vue.use(axios, { api: "" });

// bus
import Bus from "./widgets/bus";
Vue.use(Bus);

//
import vuePageTitle from "vue-wechat-title";
Vue.use(vuePageTitle);

// import qs from "qs";
// console.log(qs.stringify({ a: 1, b: 2 }, { addQueryPrefix: false }));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
