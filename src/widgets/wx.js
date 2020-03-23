export default {
  install(Vue) {
    Vue.wx = Vue.prototype.$wx = window.wx;
  }
};
