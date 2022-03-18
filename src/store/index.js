import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import authorization from "./authorization/authorization";
import admin from "./admin/admin";
import waiter from "./waiter/waiter";
import cook from "./cook/cook";

Vue.prototype.$http = Axios;
Vue.use(Vuex);

export const host = "http://127.0.0.1:8000";

const store = new Vuex.Store({
  modules: {
    authorization: authorization(),
    admin: admin(),
    waiter: waiter(),
    cook: cook(),
  },
});

export default store;
