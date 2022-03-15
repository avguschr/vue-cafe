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
      const headers = { "Content-Type": "application/json" };
      await axios({
        method: "post",
        url: `${host}/api-cafe/login`,
        headers,
        data,
      })
        .then((result) => {
          context.commit("setToken", result.data.data.user_token);
          context.commit("addError", this.error);
        })
        .catch((e) => console.log(e));
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    addError(state, error) {
      state.error = error;
    },
  },
  getters: {
    getToken: (state) => state.token,
  },
});

export default login;
