import Vue from "vue";
import "@assets/js/viewpoint";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { baseDomin } from "./config";
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
Vue.use(axios, { api: baseDomin });

// bus
import Bus from "./widgets/bus";
Vue.use(Bus);

// 自定义标题
import vuePageTitle from "vue-wechat-title";
Vue.use(vuePageTitle);

// 引入微信js-sdk
import wx from "./widgets/wx";
Vue.use(wx);

Vue.config.productionTip = false;

// mock
// require("./mock");

// 判断是否是经纪人分享的链接
import qs from "qs";
const { cityId, superiorId } = qs.parse(location.search, {
  ignoreQueryPrefix: true
});
if (cityId && superiorId) {
  toPage(false);
} else {
  toPage(true);
}

async function toPage(needLogin) {
  await Vue.gb.initAccount(needLogin, { cityId, superiorId });
  enterSystem();
}

function enterSystem() {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
}
