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
  Field,
  PullRefresh,
  Overlay,
  Image,
  Slider
} from "vant";
import Vue from 'vue'

import 'vant/lib/index.css';

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
  Field,
  PullRefresh,
  Overlay,
  Image,
  Slider
];
export const VantUi = {};
fbCmps.forEach(cmp => {
  VantUi[cmp.name] = cmp;
});
const components = fbCmps.concat(usCmps);
components.forEach(cmp => {
  Vue.use(cmp);
});