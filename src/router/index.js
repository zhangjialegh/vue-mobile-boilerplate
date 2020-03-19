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
    path: "/comment",
    name: "Comment",
    meta: {
      title: "个人简介"
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "@views/Comment.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
