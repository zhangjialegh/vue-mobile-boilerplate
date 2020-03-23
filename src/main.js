import Vue from "vue";
import "@assets/js/viewpoint";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@assets/style/common.less";

Vue.router = router;
Vue.store = store;

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

// 自定义标题
import vuePageTitle from "vue-wechat-title";
Vue.use(vuePageTitle);

// 引入微信js-sdk
import wx from "./widgets/wx";
Vue.use(wx);
// import qs from "qs";
// console.log(qs.stringify({ a: 1, b: 2 }, { addQueryPrefix: false }));

// mock

require("./mock");
Vue.config.productionTip = false;

toPage(true);

async function toPage(needLogin) {
  if (needLogin) {
    await Vue.gb.initAccount();
  }
  enterSystem();
}

function enterSystem() {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
}
