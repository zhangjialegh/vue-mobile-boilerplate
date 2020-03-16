export default {
  install(Vue, options = {}) {
    Vue.gb = Vue.prototype.$gb = {
      ...options
    };
  }
};
