import axios from "axios";
import { host } from "./../index";

const login = () => ({
  namespaced: true,
  state: {
    token: "",
    error: "",
  },
  actions: {
    async login(context, data) {
      context.commit("errorNull");
      const headers = { "Content-Type": "application/json" };
      await axios({
        method: "post",
        url: `${host}/api-cafe/login`,
        headers,
        data,
      })
        .then((result) => {
          context.commit("setToken", result.data.data.user_token);
        })
        .catch((e) => {
          this.error = e;
          context.commit("error", this.error);
        });
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    error(state, error) {
      state.error = error;
    },
    errorNull(state) {
      state.error = "";
    },
  },
  getters: {
    getToken: (state) => state.token,
    error: (state) => state.error,
  },
});

export default login;
