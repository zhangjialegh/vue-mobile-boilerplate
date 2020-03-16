import { Notify, Toast, Dialog } from "vant";
const components = [Notify, Toast, Dialog];
export const vantCmp = {};
components.forEach(cmp => {
  vantCmp[cmp.name] = cmp;
});

export const vants = {
  install(Vue) {
    components.forEach(cmp => {
      Vue.use(cmp);
    });
  }
};
