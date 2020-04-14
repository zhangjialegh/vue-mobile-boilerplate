import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "@views/Home.vue"),
    meta: {
      title: "首页"
    }
  },
  {
    path: "/about",
    name: "About",
    meta: {
      title: "关于"
    },
    component: () => import(/* webpackChunkName: "about" */ "@views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
