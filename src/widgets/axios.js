import axios from "axios";
// import { tokenName } from "@config/index";

export default {
  install(Vue) {
    // axios.defaults.baseURL = options.api || "/api";
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.post["Accept"] =
      "application/json; charset=utf-8, text/plain, */*";
    axios.defaults.headers.put["Content-Type"] = "application/json";
    axios.defaults.headers.put["Accept"] =
      "application/json; charset=utf-8, text/plain, */*";
    axios.defaults.withCredentials = true;

    axios.interceptors.request.use(
      function(request) {
        // TODO: 获取token
        // let account = Vue.store.state.account;
        // if (account && account.token) {
        //   request.headers.token = account.token;
        // }

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
        Vue.gb.Toast.clear();

        let response = error.response;
        if (response) {
          let data = response.data || {};
          if (data.code === 401) {
            // 登录无效 TODO:
            Vue.gb.toLogin();
          } else {
            if (data.message) {
              Vue.gb.Toast.fail(data.message);
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
