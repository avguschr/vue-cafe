import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import authorization from "./authorization/authorization";
import admin from "./admin/admin";

Vue.prototype.$http = Axios;
Vue.use(Vuex);

export const host = "http://127.0.0.1:8000";

const store = new Vuex.Store({
  modules: {
    authorization: authorization(),
    admin: admin(),
  },
});

export default store;
