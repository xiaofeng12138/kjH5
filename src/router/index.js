import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {path: "/",name: "index",component:() => import ('../views/homepage/index.vue')},
  {path: "/login",name: "login",component:() => import ('../views/login/index.vue')},
  {path: "/liftoff",name: "liftoff",component:() => import ('../views/index/index.vue')},
  {path: "/bgddetail",name: "bgddetail",component:() => import ('../views/detail/index.vue')},
  {path: "/enterVisual",name: "enterVisual",component:() => import ('../views/entervisual/index.vue')},
  {path: "/searchIndex",name: "searchIndex",component:() => import ('../views/entervisual/search.vue')},
  {path: "/searchResult",name: "searchResult",component:() => import ('../views/entervisual/searchresult.vue')},
  {path: "/entrylist",name: "entrylist",component:() => import ('../views/entervisual/entrylist.vue')},
];

const router = new VueRouter({
  routes
});

export default router;
