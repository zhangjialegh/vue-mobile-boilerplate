import axios from "axios";
import { tokenName } from "@config/index";

export default {
  install(Vue, options) {
    axios.defaults.baseURL = options.api || "";
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.post["Accept"] =
      "application/json; charset=utf-8, text/plain, */*";
    axios.defaults.headers.put["Content-Type"] = "application/json";
    axios.defaults.headers.put["Accept"] =
      "application/json; charset=utf-8, text/plain, */*";
    axios.defaults.withCredentials = true;

    axios.interceptors.request.use(
      function(request) {
        // 获取token
        let token = Vue.store.state.accountToken;
        if (token) {
          request.headers[tokenName] = token;
        }

        if (request.loading === true) {
          Vue.gb.Toast.loading({
            message: "加载中...",
            forbidClick: true,
            loadingType: "spinner"
          });
        }

        return request;
      },
      error => Promise.reject(error)
    );

    axios.interceptors.response.use(
      function(response) {
        Vue.gb.Toast.clear();
        return response;
      },
      function(error) {
        let response = error.response;
        if (response) {
          let data = response.data || {};
          if (data.code === 401) {
            // 登录无效
            Vue.gb.toLogin();
          } else {
            if (data.errMsg) {
              Vue.gb.Toast.fail(data.errMsg);
            } else {
              Vue.gb.Toast.fail(`请求失败`);
            }
          }
        } else {
          Vue.gb.Toast.fail(`请求失败`);
        }
        return Promise.reject(error);
      }
    );
    Vue.axios = Vue.prototype.$axios = axios;
  }
};
