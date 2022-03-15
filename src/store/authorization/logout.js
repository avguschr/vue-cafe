import axios from "axios";
import { host } from "./../index";

const logout = () => ({
  namespaced: true,
  actions: () => ({
    async logout(context) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      await axios({ method: "get", headers, url: `${host}/api-cafe/logout` })
        .then((result) => console.log(result.data.data.message))
        .catch((e) => console.log(e));
      context.commit("delToken");
    },
  }),
  mutations: () => ({
    delToken(state) {
      state.token = "";
      localStorage.removeItem("token");
    },
  }),
});

export default logout;
