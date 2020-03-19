import {
  Notify,
  Toast,
  Dialog,
  Tab,
  Tabs,
  Divider,
  ActionSheet,
  Uploader,
  Sticky,
  Lazyload,
  Button,
  Field
} from "vant";
const fbCmps = [Notify, Toast, Dialog];
const usCmps = [
  Tab,
  Tabs,
  Divider,
  ActionSheet,
  Uploader,
  Sticky,
  Lazyload,
  Button,
  Field
];
export const vantCmp = {};
fbCmps.forEach(cmp => {
  vantCmp[cmp.name] = cmp;
});
const components = fbCmps.concat(usCmps);
export const vants = {
  install(Vue) {
    components.forEach(cmp => {
      Vue.use(cmp);
    });
  }
};
