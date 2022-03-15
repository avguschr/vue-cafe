import axios from "axios";
import { host } from "..";

const user = () => ({
  namespaced: true,
  state: {
    user: {},
  },
  actions: {
    async getUser(context, id) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      await axios({
        method: "get",
        headers,
        url: `${host}/api-cafe/user/${id}`,
      })
        .then((result) => (this.user = result.data.data))
        .catch((e) => (this.error = e.message));
      context.commit("getUser", this.user);
    },
  },
  mutations: {
    getUser(state, data) {
      state.user = data;
    },
  },
  getters: {
    user: (state) => state.user,
  },
});

export default user;
