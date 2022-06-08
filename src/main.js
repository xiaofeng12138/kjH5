import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@/router/premit' //引入导航守卫
import axios from 'axios'
//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';

axios.defaults.withCredentials=true

Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");


window.addEventListener('popstate', function (e) {
  router.isBack = true
},false)
