export default {
  install(Vue, options = {}) {
    Vue.gb = Vue.prototype.$gb = {
      ...options,
      thousandFormat(num) {
        var str = num + "";
        // ["8", "7", "6", "5", "4", "3", "2", "1"]
        return str
          .split("")
          .reverse()
          .reduce((prev, next, index) => {
            return (index % 3 ? next : next + ",") + prev;
          });
      }
    };
  }
};
