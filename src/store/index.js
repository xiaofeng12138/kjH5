import Vue from "vue";
import Vuex from "vuex";
import login from './modules/login'
import detail from './modules/detail'
import requsetBgdlist from './modules/requsetBgdlist'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    detail,
    requsetBgdlist
  }
});
